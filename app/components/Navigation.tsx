import React from 'react';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';
import Link from 'next/link';

interface NavigationProps {
    searchTerm: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navigation: React.FC<NavigationProps> = ({searchTerm, handleSearchChange}) => {

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn btn-ghost m-1 btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h7"/>
                        </svg>
                    </label>
                    <ul tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href={"/document"}>Documentation</Link></li>
                    </ul>

                </div>
            </div>
            <div className="navbar-center">
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="navbar-end">
                <ThemeSwitcher/>
            </div>
        </div>
    );
};

export default Navigation;
