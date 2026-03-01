import React, { useState, useEffect, useMemo } from 'react';
import { 
    Plus, CheckCircle2, XCircle, Trash2, Loader2, DatabaseZap, 
    Search, Ghost, Edit2, Check, PlusCircle, Pencil 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TopHeader from "@/components/Top-Header";
import FieldConfigPopup from "./AddFieldPopup";
import { toast } from "sonner";
import { useSearchParams } from 'react-router-dom';
import { saveFormConfig, fetchAvailableForms } from './apis';

const SYSTEM_FIELDS = [
    { name: "id", type: "UUID", required: true, default: "auto-generated", locked: true, typeColor: "bg-indigo-100 text-indigo-700" },
    { name: "created_at", type: "DateTime", required: true, default: "CURRENT_TIMESTAMP", locked: true, typeColor: "bg-blue-100 text-blue-700" },
];

const ConfigHeader = () => {
    const [searchParams] = useSearchParams();
    const moduleId = searchParams.get('module_id');
    const [formsList, setFormsList] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const loadInitialData = async () => {
        setIsFetching(true);
        try {
            const response = await fetchAvailableForms(moduleId);
            const initializedForms = response.forms.map(form => ({
                ...form,
                currentFields: JSON.parse(form.form_fields || "[]"),
                isEditingName: false 
            }));
            setFormsList(initializedForms);
        } catch (error) {
            toast.error("Failed to load forms");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (moduleId) loadInitialData();
    }, [moduleId]);

    const handleAddNewForm = () => {
        const trashString = Math.random().toString(36).substring(7);
        const newForm = {
            id: `temp-${Date.now()}`,
            form_name: `New Form_${trashString}`,
            currentFields: [],
            is_allowed: true,
            isEditingName: true,
            isNew: true
        };
        setFormsList([newForm, ...formsList]);
    };

    const filteredForms = useMemo(() => {
        return formsList.filter(form => 
            form.form_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, formsList]);

    if (isFetching) return (
        <div className="h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );

    return (
        <div className="font-display bg-slate-50 dark:bg-background-dark text-slate-800 min-h-screen">
            <TopHeader />
            <main className="max-w-[1440px] mx-auto px-6 py-8 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <DatabaseZap className="text-primary" /> Module Schema Management
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {formsList.length > 0 && (
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                                <Input 
                                    placeholder="Search forms..." 
                                    className="pl-10 h-11 bg-white rounded-xl shadow-sm border-2 focus:border-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        )}
                        {formsList.length > 0 && (
                            <Button onClick={handleAddNewForm} className="h-11 gap-2 shadow-lg shadow-primary/20">
                                <PlusCircle className="size-5" /> Create Form
                            </Button>
                        )}
                    </div>
                </div>

                <div className="space-y-10">
                    {filteredForms.length > 0 ? (
                        filteredForms.map((form) => (
                            <FormConfigSection 
                                key={form.id} 
                                form={form} 
                                moduleId={moduleId}
                                setFormsList={setFormsList}
                            />
                        ))
                    ) : (
                        <div className="p-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <Ghost className="size-16 text-slate-200 mb-6" />
                            <h3 className="text-xl font-bold text-slate-900">There is no existing form</h3>
                            <p className="text-slate-500 mt-2 mb-8 max-w-sm">
                                No forms were found matching your criteria. Start by creating a new schema for this module.
                            </p>
                            <Button onClick={handleAddNewForm} size="lg" className="px-10 h-14 rounded-2xl font-black uppercase text-xs tracking-widest gap-2">
                                <Plus className="size-5" /> Create Now
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const FormConfigSection = ({ form, moduleId }) => {
    const [userFields, setUserFields] = useState(form.currentFields);
    const [isSaving, setIsSaving] = useState(false);
    const [tempName, setTempName] = useState(form.form_name);

    console.log("fields:", userFields)


    // Update specific field in the list
    const handleUpdateField = (updatedField, index) => {
        const newFields = [...userFields];
        newFields[index] = updatedField;
        setUserFields(newFields);
        toast.info("Field configuration updated");
    };

    const handlePublish = async () => {
        setIsSaving(true);
        try {
            const payload = { form_name: form.form_name, module_id: moduleId, fields: userFields };
            await saveFormConfig(payload, !form.isNew);
            toast.success("Schema saved!");
        } catch (error) { toast.error(error.message); }
        finally { setIsSaving(false); }
    };

    const displayFields = [...SYSTEM_FIELDS, ...userFields];

    return (
        <Card className="border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
            <CardHeader className="bg-white border-b py-5 flex flex-row items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    {form.isEditingName ? (
                        <div className="flex items-center gap-2 flex-1 max-w-md">
                            <Input 
                                value={tempName} 
                                onChange={(e) => setTempName(e.target.value)}
                                className="h-10 font-bold text-lg border-primary focus:ring-primary"
                                autoFocus
                            />
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <CardTitle className="text-xl font-bold text-slate-900">{form.form_name}</CardTitle>
                        </div>
                    )}
                </div>
                <div className="flex gap-3">
                    <FieldConfigPopup 
                        onSave={(field) => setUserFields([...userFields, field])}
                        triggerElement={<Button variant="outline" size="sm"><Plus className="w-4 mr-2"/> Add Field</Button>}
                    />
                    <Button size="sm" onClick={handlePublish} disabled={isSaving} className="bg-primary">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader><TableRow className="bg-slate-50/50">
                        <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Field Name</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Type</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Required</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>
                        {displayFields.map((field, idx) => (
                            <TableRow key={idx} className="border-b last:border-0 group hover:bg-slate-50/30 transition-colors">
                                <TableCell className="px-6 py-4 font-bold text-slate-700">{field.name}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tighter">
                                        {field.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center px-6 py-4">
                                    {field.required ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                                    )}
                                </TableCell>
                                <TableCell className="text-right px-6 py-4 space-x-1">
                                    {!field.locked && (
                                        <>
                                            {/* Edit Field Button - Opens Popup with Prefilled Data */}
                                            <FieldConfigPopup 
                                                editData={field} // Prefill existing data
                                                onSave={(updatedField) => handleUpdateField(updatedField, idx - SYSTEM_FIELDS.length)}
                                                triggerElement={
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-slate-400 hover:text-primary transition-opacity opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                }
                                            />
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-8 w-8 text-red-400 hover:text-red-600 transition-opacity opacity-0 group-hover:opacity-100" 
                                                onClick={() => setUserFields(userFields.filter((_, i) => i !== (idx - SYSTEM_FIELDS.length)))}
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ConfigHeader;