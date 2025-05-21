const TermsAndConditions = () => {
    return (
        <main className="flex-grow bg-gray-100 p-6 bg-[url('/assets/rooms-cover.png')] min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)] bg-cover bg-center bg-no-repeat">
            <div className="bg-white p-8 rounded shadow-md max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
                <p className="mb-4">
                    Welcome to our application. By accessing or using our services, you agree to be bound by the following terms and conditions. Please read them carefully.
                </p>
                <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p className="mb-4">
                    By using our services, you agree to comply with and be legally bound by these terms. If you do not agree to these terms, you may not use our services.
                </p>
                <h2 className="text-xl font-semibold mb-2">2. Changes to Terms</h2>
                <p className="mb-4">
                    We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting. Your continued use of the services constitutes your acceptance of the modified terms.
                </p>
                <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
                <p className="mb-4">
                    You agree to use our services only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the services.
                </p>
                <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
                <p className="mb-4">
                    We are not liable for any damages arising from your use of our services. Use them at your own risk.
                </p>
                <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
                <p>
                    If you have any questions about these terms, please contact us at support@example.com.
                </p>
            </div>
        </main>
    );
};

export default TermsAndConditions;