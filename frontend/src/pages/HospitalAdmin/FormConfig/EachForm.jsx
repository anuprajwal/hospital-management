import React, {useState, useEffect} from 'react';
import {
    Plus,
    CheckCircle2,
    XCircle,
    Trash2,
    ChevronLeft,
    ChevronRight, Info, Bolt, Database, Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import TopHeader from "@/components/Top-Header"
import FieldConfigPopup from "./AddFieldPopup";
import { toast } from "sonner";
import { useSearchParams } from 'react-router-dom';
import { saveFormConfig, fetchAvailableForms } from './apis';


const SYSTEM_FIELDS = [
    { name: "id", type: "UUID", required: true, default: "auto-generated", locked: true, typeColor: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    { name: "created_at", type: "DateTime", required: true, default: "CURRENT_TIMESTAMP", locked: true, typeColor: "bg-blue-100 text-blue-700 border-blue-200" },
];

const infoCards = [
    {
        title: "System Fields",
        description: "System fields (marked with 🔒) are mandatory for internal tracking and cannot be deleted or modified.",
        icon: <Info className="w-5 h-5 text-primary" />,
    },
    {
        title: "Validation",
        description: "Changes to the schema will be applied to all active OP records upon clicking \"Publish\".",
        icon: <Bolt className="w-5 h-5 text-emerald-500" />,
    },
    {
        title: "Backups",
        description: "A schema version snapshot is automatically created whenever you save or publish changes.",
        icon: <Database className="w-5 h-5 text-amber-500" />,
    },
];

const ConfigHeader = () => {
    const [searchParams] = useSearchParams();

    const moduleId = searchParams.get('module_id');

    const [userFields, setUserFields] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isFetching, setIsFetching] = useState(true); // Loading state for initial fetch
    const [existingForm, setExistingForm] = useState(null); // Stores existing form meta

    useEffect(() => {
        const saved = localStorage.getItem(`fields_${moduleId}`);
        if (saved) setUserFields(JSON.parse(saved));
    }, [moduleId]);


    const handleAddField = (newField) => {
        setUserFields([...userFields, { ...newField, locked: false }]);
    };


    const allFields = [...SYSTEM_FIELDS, ...userFields];

    useEffect(() => {
        const loadInitialData = async () => {
            setIsFetching(true);
            try {
                const forms = await fetchAvailableForms(moduleId);

                console.log(forms)
                
                // Assuming we check for a specific form name or just the first form for this module
                const currentForm = forms.forms.find(f => f.module_id === moduleId);

                if (currentForm && currentForm.fields) {
                    setExistingForm(currentForm);
                    // Filter out system fields so they don't duplicate in userFields state
                    const customFields = currentForm.fields.filter(
                        f => !SYSTEM_FIELDS.some(sf => sf.name === f.name)
                    );
                    setUserFields(customFields);
                }
            } catch (error) {
                console.error("Failed to load existing schema:", error);
                // Fallback to localStorage if API fails or is empty
                const saved = localStorage.getItem(`fields_${moduleId}`);
                if (saved) setUserFields(JSON.parse(saved));
            } finally {
                setIsFetching(false);
            }
        };

        if (moduleId) loadInitialData();
    }, [moduleId]);

    // 2. Optimized Publish Logic
    const handlePublish = async () => {
        setIsLoading(true);
        try {
            const isUpdate = !!existingForm; // If we found a form earlier, it's a PUT
            
            const payload = {
                form_name: existingForm?.form_name || "New Form", // Use existing name or default
                module_id: moduleId,
                fields: [...SYSTEM_FIELDS, ...userFields]
            };

            await saveFormConfig(payload, isUpdate);
            
            toast.success(isUpdate ? "Schema updated!" : "Schema published!");
            
            // Refresh local state to confirm update mode
            if (!isUpdate) {
                const updatedForms = await fetchAvailableForms(moduleId);
                setExistingForm(updatedForms.find(f => f.module_id === moduleId));
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen">
            <TopHeader />
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-right">
                    {/* Action Buttons Section */}
                    <div className="flex items-center space-x-3">
                        <FieldConfigPopup 
                            onSave={handleAddField}
                            triggerElement={
                                <Button variant="outline"><Plus className="w-4 h-4 mr-2"/> Add Field</Button>
                            }
                        />                        <Button 
                            onClick={handlePublish} 
                            disabled={isLoading}
                            className="bg-primary text-white"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Publish Schema"}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-6 py-8">

                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Title and Description */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            OP Module Schema
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Configure database fields, data types, and validation rules for the Outpatient Module.
                        </p>
                    </div>

                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50/50">
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Field Name</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Data Type</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Required</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Default Value</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {allFields.map((field, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-mono font-medium">{field.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={field.typeColor}>{field.type}</Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {field.required ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                                    </TableCell>
                                    <TableCell className="text-slate-500">{field.defaultValue || field.default || 'null'}</TableCell>
                                    <TableCell className="text-right">
                                        {!field.locked && (
                                            <Button variant="ghost" size="icon" className="text-red-500" onClick={() => {
                                                setUserFields(userFields.filter((_, i) => i !== (idx - SYSTEM_FIELDS.length)));
                                            }}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Footer Section */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            Showing 6 fields. <span className="text-primary font-medium">2 system fields</span> and <span className="text-primary font-medium">4 user fields</span>.
                        </p>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" disabled className="h-8 w-8">
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled className="h-8 w-8">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>


                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {infoCards.map((card, index) => (
                        <Card key={index} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                            <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-3">
                                {/* {card.icon} */}
                                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                                    {card.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {card.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>



        </div>
    );
};

export default ConfigHeader;