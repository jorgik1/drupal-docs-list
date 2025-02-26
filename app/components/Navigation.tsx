import React, { useState } from 'react';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import { Search, Menu, X, Home, BookOpen, ChevronRight } from 'lucide-react';

const Navigation = ({ searchTerm, handleSearchChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      {/* Main navigation */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and desktop nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/drupal-icon.png" 
              alt="Drupal Logo" 
              className="h-8 w-8"
            />
            <span className="hidden font-bold md:inline-block">Drupal Docs</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center gap-1 text-sm font-medium hover:text-primary"
                >
                  <Home size={16} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/document" 
                  className="flex items-center gap-1 text-sm font-medium hover:text-primary"
                >
                  <BookOpen size={16} />
                  <span>Documentation</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Search and theme toggle */}
        <div className="flex items-center gap-4">
          <div className={`relative ${isSearchExpanded ? 'w-64' : 'w-40'} transition-all duration-300`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full rounded-md border border-input bg-background px-4 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setIsSearchExpanded(false)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <ThemeSwitcher />

          {/* Mobile menu button */}
          <button 
            className="inline-flex items-center justify-center md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container mx-auto px-4 py-3">
            <nav>
              <ul className="grid gap-3">
                <li>
                  <Link 
                    href="/" 
                    className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home size={16} />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/document" 
                    className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BookOpen size={16} />
                    <span>Documentation</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      
      {/* Breadcrumbs - example, would need to be dynamic based on route */}
      <div className="container mx-auto hidden px-4 py-2 md:block">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Link href="/document" className="hover:text-foreground">Documentation</Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-foreground">Current Page</span>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
