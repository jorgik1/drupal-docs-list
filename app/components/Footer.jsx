import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-neutral text-neutral-content mt-16">
            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and info */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
                                clipRule="evenodd" className="fill-current">
                                <path
                                    d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                            </svg>
                            <h2 className="text-xl font-bold">Drupal Docs</h2>
                        </div>
                        <p className="text-base max-w-md opacity-80">
                            Find comprehensive, accessible, and user-friendly documentation to help you build amazing experiences with Drupal.
                        </p>
                    </div>
                    
                    {/* Documentation links */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Documentation</h3>
                        <ul className="space-y-2">
                            <li><Link href="/document" className="hover:underline">Browse Docs</Link></li>
                            <li><Link href="/document?category=2802989" className="hover:underline">Development</Link></li>
                            <li><Link href="/document?category=2792957" className="hover:underline">Theming</Link></li>
                            <li><Link href="/document?category=2907842" className="hover:underline">Security</Link></li>
                        </ul>
                    </div>
                    
                    {/* Resources links */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="https://www.drupal.org" target="_blank" rel="noopener noreferrer" className="hover:underline">Drupal.org</a></li>
                            <li><a href="https://www.drupal.org/community" target="_blank" rel="noopener noreferrer" className="hover:underline">Community</a></li>
                            <li><a href="https://www.drupal.org/project/project_module" target="_blank" rel="noopener noreferrer" className="hover:underline">Modules</a></li>
                            <li><a href="https://www.drupal.org/project/project_theme" target="_blank" rel="noopener noreferrer" className="hover:underline">Themes</a></li>
                        </ul>
                    </div>
                </div>
                
                {/* Bottom section */}
                <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm opacity-80">
                        Copyright © {currentYear} - All rights reserved
                    </p>
                    
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <a href="https://twitter.com/drupal" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/user/drupalassociation" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/drupal-association/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}