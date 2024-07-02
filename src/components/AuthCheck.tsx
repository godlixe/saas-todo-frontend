"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { useRouter } from "next/navigation";


const AuthCheck: React.FC = () => {
    const { userInfo } = useContext(AuthContext);
    const router = useRouter();

    if (userInfo) {
        router.push("/");
    };

    return (
        <div></div>
    );
}

export default AuthCheck