import React from 'react';
import { Link } from 'react-router-dom';

const FooterLink = ({ href, children }) => (
    <Link to={href} className="hover:underline text-gray-300 text-sm">
        {children}
    </Link>
);

const FooterSection = ({ title, children }) => (
    <div className="flex flex-col justify-between w-64 items-center gap-4">
        {title && <span className="text-lg font-semibold text-gray-100">{title}</span>}
        {children}
    </div>
);

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="container mx-auto flex flex-wrap justify-center items-start gap-8 p-8">
                {/* Logo and Description */}
                <FooterSection>
                    <Link to="/">
                        <div className="bg-[url('/assets/Logo.png')] h-10 w-32 bg-center bg-no-repeat bg-contain"></div>
                    </Link>
                    <p className="text-left text-sm">
                        Find the perfect mess or room with ease! Our platform connects you to the best accommodations in your area. Simplify your search with detailed listings and user reviews.
                    </p>
                </FooterSection>

                {/* Quick Links */}
                <FooterSection title="Quick Links">
                    <div className="grid grid-cols-2 gap-2">
                        <FooterLink href="/">Home</FooterLink>
                        <FooterLink href="/login">Login</FooterLink>
                        <FooterLink href="/submit-pg">Submit PG</FooterLink>
                        <FooterLink href="/terms">Privacy Policy</FooterLink>
                        <FooterLink href="/about">About</FooterLink>
                        <FooterLink href="/faqs">FAQs</FooterLink>
                        <FooterLink href="/report">Report</FooterLink>
                        <FooterLink href="/contact">Contact Us</FooterLink>
                    </div>
                </FooterSection>

                {/* Contact Us */}
                <FooterSection title="Contact Us">
                    <p className="text-left text-sm">
                        Bankura Sammilani College, Kenduadihi, Bankura, West Bengal - 722102
                    </p>
                    <p className="text-left text-sm">
                        Email: <a href="mailto:susantamandi.user@gmail.com" className="hover:underline">susantamandi.user@gmail.com</a>
                    </p>
                </FooterSection>
            </div>

            {/* Bottom Section */}
            <div className="bg-gray-900 text-gray-400 text-center py-4">
                <span>© MessFinder All Rights Reserved, 2025</span>
            </div>
        </footer>
    );
}

export { Footer };