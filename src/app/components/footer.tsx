"use client";

export default function Footer() {
    return (
        <footer className="text-gray-300 py-10 px-6 lg:px-20 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Company Info */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Company</h2>
                    <p className="text-gray-400">
                        DCN is a decentralized network for managing credentials and certificates. Step into your digital future with us.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Services</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Resources</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                        <li><a href="#" className="hover:text-white">FAQs</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 5 3.66 9.17 8.44 9.91v-7.02h-2.55v-2.73h2.55v-2.08c0-2.53 1.5-3.94 3.77-3.94 1.09 0 2.23.19 2.23.19v2.46h-1.25c-1.23 0-1.62.76-1.62 1.55v1.82h2.73l-.44 2.73h-2.29v7.02c4.78-.74 8.44-4.91 8.44-9.91 0-5.5-4.46-9.96-9.96-9.96z"/></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c5.5 0 9.96 4.46 9.96 9.96 0 5-3.66 9.17-8.44 9.91v-7.02h2.55v-2.73h-2.55v-2.08c0-2.53-1.5-3.94-3.77-3.94-1.09 0-2.23.19-2.23.19v2.46h1.25c1.23 0 1.62.76 1.62 1.55v1.82h-2.73l.44 2.73h2.29v7.02c-4.78-.74-8.44-4.91-8.44-9.91 0-5.5 4.46-9.96 9.96-9.96z"/></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c5.5 0 9.96 4.46 9.96 9.96 0 5-3.66 9.17-8.44 9.91v-7.02h2.55v-2.73h-2.55v-2.08c0-2.53-1.5-3.94-3.77-3.94-1.09 0-2.23.19-2.23.19v2.46h1.25c1.23 0 1.62.76 1.62 1.55v1.82h-2.73l.44 2.73h2.29v7.02c-4.78-.74-8.44-4.91-8.44-9.91 0-5.5 4.46-9.96 9.96-9.96z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            {/* Copyright */}
            <div className="text-center mt-10 text-gray-500 text-sm">
                © {new Date().getFullYear()} DCN. All rights reserved.
            </div>
        </footer>
    );
}
