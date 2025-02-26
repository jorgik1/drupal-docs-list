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
        <div className="flex flex-col min-h-screen">
            <SearchContext.Provider value={{searchTerm, setSearchTerm}}>
                <Navigation searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
                <main className="flex-grow">
                    {children}
                </main>
                <Footer/>
            </SearchContext.Provider>
        </div>
    );
}