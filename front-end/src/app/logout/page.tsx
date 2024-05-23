"use client";
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { LogoutUser } from "../../utils/storage";

function Logout() {
    const router = useRouter();

    if (localStorage.getItem("jwtToken"))
        localStorage.removeItem("jwtToken");


    return router.push("/login")
}

export default Logout