"use client";

import { authClient } from "@/lib/auth-client";
import { BarChart, CheckCircle2 } from "lucide-react";

export default function DirectorDashboard() {
  const { data: session } = authClient.useSession();
  
  // @ts-ignore
  const userRole = session?.user?.roleId || '';
  const isManager = userRole.includes('MANAGER') || userRole === 'DIRECTOR' || userRole === 'ADMIN';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <BarChart className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Director Dashboard</h1>
          <p className="text-gray-500">Role-specific dashboard access.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-4 text-green-600 relative z-10">
            <CheckCircle2 className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Access Granted</h2>
          </div>
          <p className="text-gray-600 mb-6 relative z-10">
            The backend verified your Admin/Director role and authorized access to the global workspace.
          </p>
          
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 relative z-10">
            <p className="text-sm text-gray-800">
              Welcome to the God-Mode view. You have unrestricted access to all departments. 
              <br/><br/>
              <b>To view real demo data, select one of the departments from the sidebar:</b>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                <li><b>Marketing Hub:</b> AI Voice Agents, WhatsApp Broadcasts, SMS, Email</li>
                <li><b>Pre-Sales Manager:</b> Lead Call Center & Pipeline</li>
                <li><b>Sales Manager:</b> Site Visits, Negotiations, Bookings</li>
                <li><b>Post-Sales Manager:</b> Demand Letters, Collections, Handovers</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
