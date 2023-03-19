"use client";
import React from "react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";

export default function MainLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navigation/>
            {children}
            <Footer/>
        </>
    );
}