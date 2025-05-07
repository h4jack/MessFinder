import React from 'react';

// File: /s:/WorkSpace/MessFinder/client/src/components/ui/others/about.jsx


const About = () => {
    return (
        <>
            {/* Main Content */}
            <main className="flex-grow p-6 min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)]">
                <section className="max-w-4xl mx-auto bg-gray-200 shadow-md rounded-lg p-6">
                    <h2 className="text-3xl font-bold mb-4">About MessFinder</h2>
                    <p className="text-gray-900 mb-4">
                        MessFinder is a platform designed to help students and working professionals find affordable rooms in the locations where they are likely to reside for work or study purposes. It bridges the gap between individuals seeking accommodation and property owners looking to rent out their spaces.
                    </p>

                    <h3 className="text-2xl font-semibold mt-6 mb-2">Key Features</h3>
                    <ul className="list-disc list-inside text-gray-900 mb-4">
                        <li>Search for affordable rooms based on location and budget.</li>
                        <li>Connect with property owners directly through the platform.</li>
                        <li>Filter options for students and working professionals.</li>
                        <li>Verified listings to ensure safety and reliability.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-6 mb-2">For Property Owners</h3>
                    <p className="text-gray-900 mb-4">
                        MessFinder allows hotel owners and homeowners to list their properties for rent. This provides an opportunity to reach a wider audience and ensure their spaces are utilized effectively.
                    </p>

                    <h3 className="text-2xl font-semibold mt-6 mb-2">Developer License</h3>
                    <p className="text-gray-900 mb-4">
                        This project is developed under an open-source license. Developers are encouraged to contribute and improve the platform while adhering to the licensing terms.
                    </p>

                    <h3 className="text-2xl font-semibold mt-6 mb-2">Privacy Policy</h3>
                    <p className="text-gray-900 mb-4">
                        MessFinder values user privacy. All personal data is handled securely and is not shared with third parties without consent. For more details, refer to our privacy policy.
                    </p>
                </section>
            </main>
        </>
    );
};

export {
    About  
};