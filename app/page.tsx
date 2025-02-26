import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Home() {
  // Popular categories
  const popularCategories = [
    {
      id: 2802989,
      name: "Development",
      description: "Core development concepts and practices for Drupal",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 2804427,
      name: "Local Setup",
      description: "Set up your local development environment",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2792957,
      name: "Theming",
      description: "Create custom themes for your Drupal site",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2907842,
      name: "Security",
      description: "Best practices for securing your Drupal site",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
  ];

  // Recent documentation
  const recentDocs = [
    { id: 123, title: "Setting up Composer with Drupal 10", date: "3 days ago" },
    { id: 456, title: "Creating Custom Block Types", date: "1 week ago" },
    { id: 789, title: "Implementing RESTful APIs in Drupal", date: "2 weeks ago" },
  ];

  return (
    <>
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-base-300 to-base-100">
        <div className="hero min-h-[70vh]">
          <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl">
            <div className="lg:w-1/2 flex justify-center">
              <Image
                width={350}
                height={330}
                className="rounded-lg shadow-2xl transition-all hover:scale-105 duration-300"
                src={'/drupal-icon.png'}
                alt={'Drupal logo'}
                priority
              />
            </div>
            <div className="lg:w-1/2 lg:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Drupal Documentation
              </h1>
              <p className="py-6 text-lg text-gray-600 max-w-2xl">
                Find comprehensive, accessible, and user-friendly documentation to help you build amazing experiences with Drupal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/document">
                  <button className="btn btn-primary">
                    Browse Documentation
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </Link>
                
                <a href="https://www.drupal.org" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  Visit Drupal.org
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="w-full h-24 overflow-hidden">
          <svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" className="fill-base-100">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Popular categories section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category) => (
              <Link 
                key={category.id}
                href={`/document?category=${category.id}`}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-base-200"
              >
                <div className="card-body">
                  <div className="text-primary mb-4">
                    {category.icon}
                  </div>
                  <h3 className="card-title">{category.name}</h3>
                  <p className="text-gray-500">{category.description}</p>
                  <div className="card-actions justify-end mt-4">
                    <div className="badge badge-outline">Browse</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recently updated section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recently Updated</h2>
            <Link href="/document" className="btn btn-sm btn-ghost">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-base-100 rounded-lg shadow overflow-hidden">
            <div className="divide-y">
              {recentDocs.map((doc) => (
                <Link 
                  key={doc.id}
                  href={`/document/${doc.id}`}
                  className="flex items-center p-4 hover:bg-base-200 transition-colors"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{doc.title}</h3>
                    <p className="text-sm text-gray-500">Updated {doc.date}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to contribute?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Help improve the Drupal documentation by contributing your knowledge and expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.drupal.org/contribute" className="btn bg-white text-primary hover:bg-gray-100">
              Get Involved
            </a>
            <a href="https://www.drupal.org/community" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
              Join the Community
            </a>
          </div>
        </div>
      </section>
    </>
  );
}