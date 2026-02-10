// import React, { useState } from "react";
// import { 
//     BadgeCheck, Lock, Eye, EyeOff, 
//     Activity, ShieldCheck, CloudSync, Zap 
// } from "lucide-react";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

// export default function LoginPage() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     const handleLogin = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         // Simulate API call
//         setTimeout(() => setIsLoading(false), 2000);
//     };

//     return (
//         <div className="min-h-screen w-full bg-slate-50 dark:bg-[#0b1120] font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
//             <div className="flex min-h-screen w-full flex-col lg:flex-row">
                
//                 {/* --- Left Side: Branding & Features --- */}
//                 <div className="relative hidden lg:flex lg:w-[45%] flex-col items-center justify-center p-12 overflow-hidden border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a]">
//                     {/* Subtle Background Pattern */}
//                     <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
//                         <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#grid-pattern)" /><defs><pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" /></pattern></defs></svg>
//                     </div>

//                     <div className="relative z-10 max-w-md w-full text-center">
//                         <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 mb-8">
//                             <Activity size={32} />
//                         </div>
                        
//                         <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
//                             HMS<span className="text-blue-600">.</span>
//                         </h1>
//                         <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
//                             The central nervous system for your healthcare facility. Manage patients, staff, and operations in one place.
//                         </p>

//                         <div className="mt-12 group">
//                             <AspectRatio ratio={16 / 10} className="bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 transition-transform duration-500 group-hover:scale-[1.02]">
//                                 <img
//                                     src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
//                                     alt="Healthcare Interface"
//                                     className="object-cover w-full h-full"
//                                 />
//                             </AspectRatio>
//                         </div>

//                         <div className="mt-16 flex justify-between px-4">
//                             <FeatureItem icon={<ShieldCheck className="w-6 h-6" />} label="HIPAA Ready" />
//                             <FeatureItem icon={<CloudSync className="w-6 h-6" />} label="Real-time" />
//                             <FeatureItem icon={<Zap className="w-6 h-6" />} label="Optimized" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- Right Side: Login Form --- */}
//                 <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
//                     <div className="w-full max-w-[420px] space-y-8">
//                         <div className="text-center lg:hidden mb-8">
//                             <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white mb-4">
//                                 <Activity size={24} />
//                             </div>
//                             <h2 className="text-2xl font-bold dark:text-white">HMS Portal</h2>
//                         </div>

//                         <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900/50 backdrop-blur-sm ring-1 ring-slate-200 dark:ring-slate-800">
//                             <CardHeader className="space-y-2 pb-6">
//                                 <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
//                                     Welcome back
//                                 </CardTitle>
//                                 <CardDescription className="text-slate-500">
//                                     Please enter your credentials to access your account.
//                                 </CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <form onSubmit={handleLogin} className="space-y-5">
//                                     <div className="space-y-2">
//                                         <Label htmlFor="role" className="text-sm font-medium">Professional Role</Label>
//                                         <Select>
//                                             <SelectTrigger id="role" className="h-12 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-blue-500">
//                                                 <SelectValue placeholder="Select your role" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="doctor">Doctor</SelectItem>
//                                                 <SelectItem value="receptionist">Receptionist</SelectItem>
//                                                 <SelectItem value="admin">Administrator</SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                     </div>

//                                     <div className="space-y-2">
//                                         <Label htmlFor="employee-id" className="text-sm font-medium">Employee ID</Label>
//                                         <div className="relative">
//                                             <BadgeCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
//                                             <Input
//                                                 id="employee-id"
//                                                 placeholder="EMP-12345"
//                                                 className="h-12 pl-11 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-blue-500"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="space-y-2">
//                                         <div className="flex items-center justify-between">
//                                             <Label htmlFor="password text-sm font-medium">Password</Label>
//                                             <Button variant="link" className="h-auto p-0 text-xs text-blue-600 dark:text-blue-400">
//                                                 Forgot?
//                                             </Button>
//                                         </div>
//                                         <div className="relative">
//                                             <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
//                                             <Input
//                                                 id="password"
//                                                 type={showPassword ? "text" : "password"}
//                                                 placeholder="••••••••"
//                                                 className="h-12 pl-11 pr-11 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-blue-500"
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
//                                             >
//                                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <Button 
//                                         type="submit" 
//                                         disabled={isLoading}
//                                         className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all active:scale-[0.98]"
//                                     >
//                                         {isLoading ? "Authenticating..." : "Sign In"}
//                                     </Button>
//                                 </form>
//                             </CardContent>
//                         </Card>

//                     </div>
//                 </div>

//                 {/* Status Indicator */}
//                 <div className="fixed bottom-6 right-6 hidden md:flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm">
//                     <div className="flex items-center gap-1.5">
//                         <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
//                         <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">System Online</span>
//                     </div>
//                     <span className="text-[10px] font-medium text-slate-400">v1.0.4</span>
//                 </div>
//             </div>
//         </div>

//     );
// }

// function FeatureItem({ icon, label }) {
//     return (
//         <div className="flex flex-col items-center gap-3">
//             <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
//                 {icon}
//             </div>
//             <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
//                 {label}
//             </span>
//         </div>
//     );
// }




import React, { useState } from "react";
import { 
    Activity, ShieldCheck, CloudSync, Zap, 
    BadgeCheck, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 
} from "lucide-react";
import { loginUser } from "./LoginApis"; // Import the service

// Shadcn UI Imports
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Form States
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: ""
    });

    // Response State (to show "as is" to user)
    const [apiResponse, setApiResponse] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setApiResponse(null);

        const result = await loginUser(formData);
        
        setApiResponse(result);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-[#0b1120] font-sans">
            <div className="flex min-h-screen w-full flex-col lg:flex-row">
                
                {/* --- Left Side: Branding (Keep your original code here) --- */}
                <div className="relative hidden lg:flex lg:w-[45%] flex-col items-center justify-center p-12 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a]">
                    <div className="relative z-10 max-w-md w-full text-center">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg mb-8">
                            <Activity size={32} />
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl"> HMS<span className="text-blue-600">.</span></h1>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">The central nervous system for your healthcare facility.</p>
                        <div className="mt-12">
                            <AspectRatio ratio={16 / 10} className="bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070" alt="UI" className="object-cover" />
                            </AspectRatio>
                        </div>
                    </div>
                </div>

                {/* --- Right Side: Login Form --- */}
                <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
                    <div className="w-full max-w-[420px] space-y-6">
                        
                        {/* API Response Display */}
                        {apiResponse && (
                            <Alert variant={apiResponse.ok ? "default" : "destructive"} className={apiResponse.ok ? "border-emerald-500 text-emerald-600" : ""}>
                                {apiResponse.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                <AlertTitle>{apiResponse.ok ? "Success" : "Authentication Error"}</AlertTitle>
                                <AlertDescription className="mt-2 font-mono text-xs overflow-auto max-h-32">
                                    <p className="mb-1 font-bold">Status: {apiResponse.status}</p>
                                    <pre>{JSON.stringify(apiResponse.data, null, 2)}</pre>
                                </AlertDescription>
                            </Alert>
                        )}

                        <Card className="border-none shadow-2xl bg-white dark:bg-slate-900/50 backdrop-blur-sm ring-1 ring-slate-200 dark:ring-slate-800">
                            <CardHeader className="space-y-2 pb-6">
                                <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                                <CardDescription>Enter your credentials to access your account.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleLogin} className="space-y-5">
                                    {/* Role Selection */}
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Professional Role</Label>
                                        <Select onValueChange={(value) => setFormData({...formData, role: value})}>
                                            <SelectTrigger id="role" className="h-12">
                                                <SelectValue placeholder="Select your role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {/* <SelectItem value="doctor">Doctor</SelectItem> */}
                                                <SelectItem value="Receptionist">Receptionist</SelectItem>
                                                <SelectItem value="Super_Admin">Administrator</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Username (Employee ID) */}
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Employee ID</Label>
                                        <div className="relative">
                                            <BadgeCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                            <Input
                                                id="username"
                                                required
                                                placeholder="EMP-12345"
                                                className="h-12 pl-11"
                                                value={formData.username}
                                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            <Button variant="link" className="h-auto p-0 text-xs text-blue-600">Forgot?</Button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                required
                                                placeholder="••••••••"
                                                className="h-12 pl-11 pr-11"
                                                value={formData.password}
                                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={isLoading}
                                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                                    >
                                        {isLoading ? "Authenticating..." : "Sign In"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}