"use client";
import React, {useState} from "react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import SearchContext from "@/app/context/SearchContext";

export default function MainLayout({children}: {
    children: React.ReactNode;
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    return (
        <>
            <SearchContext.Provider value={{searchTerm, setSearchTerm}}>
                <Navigation searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
                {children}
                <Footer/>
            </SearchContext.Provider>
        </>
    );
}