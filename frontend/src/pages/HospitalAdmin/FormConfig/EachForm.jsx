import React from 'react';
import {
    Plus, Lock,
    CheckCircle2,
    XCircle,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight, Info, Bolt, Database
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import TopHeader from "@/components/Top-Header"
import FieldConfigPopup from "./AddFieldPopup";


const schemaFields = [
    { name: "id", type: "UUID", required: true, default: "auto-generated", locked: true, typeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200" },
    { name: "created_at", type: "DateTime", required: true, default: "CURRENT_TIMESTAMP", locked: true, typeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200" },
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
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen">
            <TopHeader />
            <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-right">
                    {/* Action Buttons Section */}
                    <div className="flex items-center space-x-3">
                        <FieldConfigPopup
                            triggerElement={
                                <Button
                                    variant="outline"
                                    className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary font-semibold"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Field
                                </Button>
                            }
                        />
                        {/* Save Schema - Secondary/Ghostly style */}
                        <Button
                            variant="secondary"
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold"
                        >
                            Save Schema
                        </Button>
                    </div>
                </div>
            </header>

            <main class="max-w-[1440px] mx-auto px-6 py-8">

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
                            {schemaFields.map((field) => (
                                <TableRow
                                    key={field.name}
                                    className={cn(
                                        "group transition-colors",
                                        field.locked ? "bg-slate-50/30 dark:bg-slate-800/20" : "hover:bg-primary/5 dark:hover:bg-primary/10"
                                    )}
                                >
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {field.locked && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                                            <code className={cn(
                                                "font-semibold",
                                                field.locked ? "text-slate-700 dark:text-slate-300" : "text-slate-900 dark:text-white"
                                            )}>
                                                {field.name}
                                            </code>
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-6 py-4">
                                        <Badge
                                            variant="outline"
                                            className={cn("rounded-full font-medium", field.typeColor || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")}
                                        >
                                            {field.type}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="px-6 py-4 text-center">
                                        {field.required ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-slate-300 mx-auto" />
                                        )}
                                    </TableCell>

                                    <TableCell className="px-6 py-4">
                                        <span className={cn(
                                            "text-sm font-mono",
                                            field.default === "null" ? "italic text-slate-400" : "text-slate-600 dark:text-slate-400"
                                        )}>
                                            {field.default}
                                        </span>
                                    </TableCell>

                                    <TableCell className="px-6 py-4 text-right">
                                        <div className={cn(
                                            "flex items-center justify-end space-x-1 transition-opacity",
                                            !field.locked ? "opacity-0 group-hover:opacity-100" : ""
                                        )}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                disabled={field.locked}
                                                className="h-8 w-8 text-slate-600 hover:text-primary hover:bg-primary/10"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                disabled={field.locked}
                                                className="h-8 w-8 text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
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
                                {card.icon}
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