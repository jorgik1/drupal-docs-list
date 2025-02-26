import React, { useState, useEffect } from 'react';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationProps {
    searchTerm: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navigation: React.FC<NavigationProps> = ({searchTerm, handleSearchChange}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Handle scroll effect for sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 w-full ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 relative">
                            <Image 
                                src="/drupal-icon.png" 
                                alt="Drupal Logo" 
                                width={32}
                                height={32}
                            />
                        </div>
                        <span className="text-lg font-bold hidden md:inline">Drupal Docs</span>
                    </Link>

                    {/* Mobile menu button - only visible on mobile */}
                    <div className="dropdown dropdown-hover md:hidden">
                        <label 
                            tabIndex={0} 
                            className="btn btn-ghost m-1 btn-circle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"/>
                            </svg>
                        </label>
                        <ul tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link href="/" className="flex items-center gap-2 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/document" className="flex items-center gap-2 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Desktop menu - only visible on desktop */}
                    <div className="hidden md:flex md:ml-6">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <Link href="/" className="flex items-center gap-2 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/document" className="flex items-center gap-2 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="navbar-center">
                    <div className={`form-control transition-all duration-300 ${isSearchFocused ? 'w-64' : 'w-full'}`}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                className="input input-bordered w-full pl-10"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="absolute left-3 top-3 h-5 w-5 text-gray-400" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchTerm && (
                                <button 
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    onClick={() => handleSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <ThemeSwitcher/>
                </div>
            </div>

            {/* Breadcrumb - only visible on desktop */}
            <div className="hidden md:block text-sm breadcrumbs bg-base-100 px-4 py-2 border-t border-base-200">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/document">Documentation</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Navigation;