import { Link } from 'react-router-dom';
import { Logo } from '../ui';

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

    const quickLinks = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Login",
            href: "/auth/login"
        },
        {
            name: "Submit PG",
            href: "/owner/submit-pg"
        },
        {
            name: "Privacy Policy",
            href: "/info/terms"
        },
        {
            name: "About",
            href: "/info/about"
        },
        {
            name: "FAQs",
            href: "/info/faqs"
        },
        {
            name: "Report",
            href: "/info/report"
        },
        {
            name: "Contact Us",
            href: "/info/contact"
        }
    ];

    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="container mx-auto flex flex-wrap justify-center items-start gap-8 p-8">
                {/* Logo and Description */}
                <FooterSection>
                    <Logo />
                    <p className="text-left text-sm">
                        Find the perfect mess or room with ease! Our platform connects you to the best accommodations in your area. Simplify your search with detailed listings and user reviews.
                    </p>
                </FooterSection>

                {/* Quick Links */}
                <FooterSection title="Quick Links">
                    <div className="grid grid-cols-2 gap-2">
                        {quickLinks.map((link, index) => (
                            <FooterLink key={index} href={link.href}>{link.name}</FooterLink>
                        ))}
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

export default Footer;