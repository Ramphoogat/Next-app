"use client";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

const AdminDashboard = dynamic(() => import("@/components/dashboards/AdminDashboard"), {
    ssr: false,
    loading: () => <div className="flex h-screen items-center justify-center"><Loader text="Loading Admin Dashboard..." /></div>,
});
const AuthorDashboard = dynamic(() => import("@/components/dashboards/AuthorDashboard"), {
    ssr: false,
    loading: () => <div className="flex h-screen items-center justify-center"><Loader text="Loading Author Dashboard..." /></div>,
});
const EditorDashboard = dynamic(() => import("@/components/dashboards/EditorDashboard"), {
    ssr: false,
    loading: () => <div className="flex h-screen items-center justify-center"><Loader text="Loading Editor Dashboard..." /></div>,
});
const UserDashboard = dynamic(() => import("@/components/dashboards/UserDashboard"), {
    ssr: false,
    loading: () => <div className="flex h-screen items-center justify-center"><Loader text="Loading Dashboard..." /></div>,
});

const UnifiedDashboard = () => {
    const router = useRouter();

    const hasHydrated = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );

    const role = hasHydrated ? (localStorage.getItem("role") || sessionStorage.getItem("role")) : null;

    useEffect(() => {
        if (hasHydrated && !role) {
            router.replace("/login");
        }
    }, [hasHydrated, role, router]);

    if (!hasHydrated || !role) return null;

    switch (role) {
        case "admin":
            return <AdminDashboard />;
        case "author":
            return <AuthorDashboard />;
        case "editor":
            return <EditorDashboard />;
        case "user":
            return <UserDashboard />;
        default:
            return null;
    }
};

export default UnifiedDashboard;
