import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Instagram,
    Facebook,
    Youtube,
    Twitter,
    ArrowUp,
    Phone,
    ExternalLink
} from "lucide-react";

const Footer = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const paymentMethods = [
        { id: 1, name: "UPI", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" },
        { id: 3, name: "Visa", src: "https://www.pngplay.com/wp-content/uploads/12/Visa-Card-Logo-No-Background.png" },
        { id: 4, name: "RuPay", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/2560px-RuPay.svg.png" },
        { id: 5, name: "Internet Banking", src: "https://casinon.in/wp-content/uploads/Netbanking.webp" },
    ];

    

    return (
        <footer className="w-full bg-[url('https://img.freepik.com/premium-vector/thai-pattern-supreme-blue-background_58796-63.jpg')] bg-cover bg-center bg-no-repeat relative text-gray-800">
            <div className="absolute inset-0 bg-white bg-opacity-90"></div>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Social Media Section */}
                    <div className="animate-fade-in">
                        <div className="mt-[-50px]">
                            <img
                                src="https://varietyheaven.in/logos/blk.svg"
                                alt="Variety Heaven Logo"
                                className="h-40 object-contain"
                            />
                        </div>

                        <div className="flex space-x-3 mb-6">
                            <a href="#" className="social-icon border border-gray-300">
                                <Instagram size={35} />
                            </a>
                            <a href="#" className="social-icon border border-gray-300">
                                <img className="h-8" src="https://cdn-icons-png.flaticon.com/512/1384/1384023.png" alt="whatsapp" />
                            </a>
                        </div>

                        <div className="flex items-center space-x-2 text-sm">
                            <Phone size={16} />
                            <span>Variety Heaven</span>
                            <span className="ml-1">🌿</span>
                        </div>
                    </div>

                    {/* Information Column */}
                    <div className="animate-scroll-up" style={{ animationDelay: "0.1s" }}>
                        <h3 className="footer-heading">Information</h3>
                        <ul className="space-y-1 text-gray-600">
                            <li><Link to="#" className="footer-link">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Marketplace Storefronts Column */}
                    <div className="animate-scroll-up" style={{ animationDelay: "0.2s" }}>
                        <h3 className="footer-heading">Our Storefronts</h3>
                        <ul className="space-y-4 mt-2 text-gray-600">
                            <li>
                                <a
                                    href="https://www.amazon.in/s?rh=n%3A1571271031%2Cp_4%3AVARIETY%2BHEAVEN"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    <img
                                        src="https://companieslogo.com/img/orig/AMZN-e9f942e4.png?t=1722944001"
                                        alt="Amazon Store"
                                        className="h-8 object-contain"
                                    />
                                    <span className="text-sm flex items-center">
                                        Shop on Amazon <ExternalLink size={14} className="ml-1" />
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.flipkart.com/womens-sarees/variety-heaven~brand/pr?sid=clo,8on,zpd,9og&marketplace=FLIPKART&otracker=product_breadCrumbs_VARIETY+HEAVEN+Women%27s+Sarees"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    <img
                                        src="https://seeklogo.com/images/F/flipkart-logo-3F33927DAA-seeklogo.com.png"
                                        alt="Flipkart Store"
                                        className="h-8 object-contain"
                                    />
                                    <span className="text-sm flex items-center">
                                        Shop on Flipkart <ExternalLink size={14} className="ml-1" />
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service Column */}
                    <div className="animate-scroll-up" style={{ animationDelay: "0.3s" }}>
                        <h3 className="footer-heading">Customer Service</h3>
                        <ul className="space-y-1 text-gray-600">
                            <li><Link to="/contact" className="footer-link">Contact</Link></li>
                            <li><Link to="/faqs" className="footer-link">FAQ</Link></li>
                            <li><Link to="/policies" className="footer-link">Shipping Policy</Link></li>
                            <li><Link to="/policies" className="footer-link">Exchange Refund/Return Policy</Link></li>
                            <li><Link to="/policies" className="footer-link">Cancellation Policy</Link></li>
                            <li><Link to="#" className="footer-link">Track Order</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Payment Methods Section */}
                <div className="mt-12 py-6 border-t border-gray-200">
                    <h3 className="footer-heading text-center mb-6">Accepted Payment Methods</h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-xs mx-auto">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-center h-12">
                                <img
                                    src={method.src}
                                    alt={method.name}
                                    className="h-full object-contain max-w-full"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center mt-6">
                        <span className="text-sm text-gray-600 mr-2">Payments powered by</span>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/77/Razorpay_logo.png"
                            alt="Razorpay"
                            className="h-6 object-contain"
                        />
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        Copyright © 2025 Variety Heaven. All Right Reserved
                        <span className="mx-2">|</span>
                        <Link to="/policies" className="hover:text-black">Terms of service</Link>
                        <span className="mx-2">|</span>
                        <Link to="/policies" className="hover:text-black">Privacy Policy</Link>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`scroll-to-top ${showScrollButton ? 'visible' : ''}`}
                aria-label="Scroll to top"
            >
                <ArrowUp size={20} />
            </button>
        </footer>
    );
};

export default Footer;
