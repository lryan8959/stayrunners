"use client";
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { LogoutUser } from "../../utils/storage";

function Logout() {
    const router = useRouter();

    useEffect(() => {
        LogoutUser();
    }, [LogoutUser])


    return router.push("/login")
}

export default Logout