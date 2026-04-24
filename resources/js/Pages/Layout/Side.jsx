import React, { useEffect } from "react";
import Sidebar from "../Admin/Sidebar";
import { Toaster } from "react-hot-toast";

export default function Side({ children }) {
    return (
        <div className="flex min-h-screen">
            <Toaster position="top-right" />
            <Sidebar />
            <div className="flex-1">
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}
