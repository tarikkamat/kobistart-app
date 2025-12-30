import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50/90 via-blue-50/90 to-slate-50/90 backdrop-blur-lg dark:border-white/10 dark:bg-gradient-to-b dark:from-slate-900/70 dark:via-slate-800/70 dark:to-slate-900/70">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 font-bold text-white dark:bg-white dark:text-black">
                                K
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                KobiStart
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Empowering small businesses with explainable AI platform recommendations.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                            Product
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    Nasıl Çalışır
                                </a>
                            </li>
                            <li>
                                <a href="#comparison" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    Karşılaştır
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                            Company
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    Hakkımızda
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                            Legal
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    Gizlilik
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    KVKK
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-200 py-6 md:flex-row dark:border-white/10">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © {currentYear} KobiStart. All rights reserved.
                    </p>
                    <div className="mt-4 flex gap-4 md:mt-0">
                        {/* Social Placeholders */}
                        <div className="h-5 w-5 rounded bg-gray-200 dark:bg-white/20" />
                        <div className="h-5 w-5 rounded bg-gray-200 dark:bg-white/20" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
