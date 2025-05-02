import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is MessFinder?",
            answer:
                "MessFinder is a platform designed to help students and working professionals find affordable rooms in locations where they are likely to reside for study or work purposes. It also allows homeowners and hotel owners to list their properties for rent.",
        },
        {
            question: "How does MessFinder work?",
            answer:
                "MessFinder connects room seekers with property owners. Room seekers can search for rooms based on their location and preferences, while property owners can list their rooms with details and pricing.",
        },
        {
            question: "Is MessFinder free to use?",
            answer:
                "For room seekers, MessFinder is free to browse and search for rooms. Property owners may have to pay a small fee to list their properties, depending on the plan they choose.",
        },
        {
            question: "How can I list my property on MessFinder?",
            answer:
                "You can list your property by signing up as an owner, filling in the property details, uploading images, and setting the price. Once submitted, your property will be visible to potential tenants.",
        },
        {
            question: "What types of properties can I find on MessFinder?",
            answer:
                "You can find a variety of properties, including single rooms, shared rooms, apartments, and hostels, depending on your needs and budget.",
        },
        {
            question: "Is there a verification process for property listings?",
            answer:
                "Yes, MessFinder ensures that all property listings go through a verification process to maintain quality and authenticity.",
        },
        {
            question: "Can I contact the property owner directly?",
            answer:
                "Yes, once you find a property you are interested in, you can contact the owner directly through the platform to discuss further details.",
        },
        {
            question: "What if I face issues with a property I rented through MessFinder?",
            answer:
                "MessFinder provides a support system to address any issues you may face. You can contact our support team for assistance.",
        },
        {
            question: "How secure is my data on MessFinder?",
            answer:
                "MessFinder takes data privacy seriously. Your data is stored securely and is not shared with third parties without your consent.",
        },
        {
            question: "Can I update or remove my property listing?",
            answer:
                "Yes, as a property owner, you can update or remove your property listing at any time through your account dashboard.",
        },
    ];

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <main className="min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center p-2">
            <div className="bg-blue-50 shadow-md rounded-lg w-full sm:w-120 p-6">
                <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
                    Frequently Asked Questions
                </h1>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-xl shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center p-4 text-lg font-medium text-gray-800 bg-gray-50 hover:bg-gray-200 focus:outline-none cursor-pointer"
                            >
                                <span>{faq.question}</span>
                                {activeIndex === index ? (
                                    <FiChevronUp className="text-gray-600" />
                                ) : (
                                    <FiChevronDown className="text-gray-600" />
                                )}
                            </button>
                            {activeIndex === index && (
                                <div className="p-4 text-gray-700 bg-white border-t border-gray-300">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export { Faqs };