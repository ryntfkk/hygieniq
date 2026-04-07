import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    ShoppingBag,
    CheckCircle2,
    ExternalLink,
    ShieldCheck,
    Sparkles,
    ArrowRight,
    Instagram,
    Facebook,
    MessageCircle,
    Menu,
    X,
    Users,
    Percent,
    Wallet,
    Rocket,
    ChevronLeft,
    Play,
    Phone
} from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────────
const WA_NUMBER = "62"; // Ganti dengan nomor WhatsApp bisnis
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Halo%20Hygieniq%2C%20saya%20ingin%20bertanya%20tentang%20produk%20Anda.`;

const MARKETPLACES = [
    { name: "Shopee", url: "https://shopee.co.id/search?keyword=Hygieniq", color: "bg-[#EE4D2D]" },
    { name: "Tokopedia", url: "https://www.tokopedia.com/search?st=product&q=Hygieniq", color: "bg-[#42B549]" },
    { name: "Lazada", url: "https://www.lazada.co.id/catalog/?q=Hygieniq", color: "bg-[#000083]" },
    { name: "Blibli", url: "https://www.blibli.com/jual/hygieniq", color: "bg-[#0095DA]" },
    { name: "TikTok Shop", url: "https://www.tiktok.com/search?q=Hygieniq", color: "bg-black" },
];

const PRODUCT = {
    id: 1,
    name: "Hygieniq All Purpose Refresher",
    description: "Pewangi serbaguna dengan formula anti-bakteri yang ampuh membunuh bakteri penyebab bau pada berbagai permukaan tanpa merusak material.",
    image: "/product.png",
    features: ["Anti-Bakteri 99.9%", "Ramah Lingkungan", "Aroma Segar"],
};

const REVIEWS = [
    { img: "/review1.png", name: "@sarah_clean" },
    { img: "/review2.png", name: "@budi_hygiene" },
    { img: "/review3.png", name: "@mama_bersih" },
    { img: "/review4.png", name: "@clean_freak_id" },
];

// ── Types ──────────────────────────────────────────────────────────────────────
type Page = 'home' | 'affiliate';

interface NavigationProps {
    currentPage: Page;
    setCurrentPage: (p: Page) => void;
    isMenuOpen: boolean;
    toggleMenu: () => void;
    setIsMenuOpen: (v: boolean) => void;
}

// ── Navigation (outside App to prevent re-creation on every render) ─────────
function Navigation({ currentPage, setCurrentPage, isMenuOpen, toggleMenu, setIsMenuOpen }: NavigationProps) {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setCurrentPage('home')}
                    >
                        <img
                            src="/logo.png"
                            alt="Hygieniq Logo"
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const sibling = e.currentTarget.nextElementSibling as HTMLElement | null;
                                if (sibling) sibling.style.display = 'flex';
                            }}
                        />
                        <div className="hidden w-8 h-8 bg-hy-blue rounded-lg items-center justify-center">
                            <ShieldCheck className="text-white w-5 h-5" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-hy-dark">
                            HYGIENIQ<span className="text-hy-blue">.</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        {currentPage === 'home' ? (
                            <>
                                <a href="#produk" className="hover:text-hy-blue transition-colors">Produk</a>
                                <a href="#marketplace" className="hover:text-hy-blue transition-colors">Marketplace</a>
                                <a href="#tentang" className="hover:text-hy-blue transition-colors">Tentang Kami</a>
                            </>
                        ) : (
                            <button
                                onClick={() => setCurrentPage('home')}
                                className="flex items-center gap-2 hover:text-hy-blue transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" /> Kembali ke Beranda
                            </button>
                        )}
                        <button
                            onClick={() => setCurrentPage('affiliate')}
                            className={`transition-colors ${currentPage === 'affiliate' ? 'text-hy-blue' : 'hover:text-hy-blue'}`}
                        >
                            Affiliate
                        </button>
                        <a
                            href={WA_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-hy-blue text-white px-5 py-2 rounded-full hover:bg-hy-blue/90 transition-all shadow-lg shadow-hy-blue/20 flex items-center gap-2"
                        >
                            <Phone className="w-3.5 h-3.5" /> Hubungi Kami
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-hy-dark p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {currentPage === 'home' ? (
                                <>
                                    <a
                                        href="#produk"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-3 py-4 text-base font-medium text-hy-dark hover:text-hy-blue hover:bg-blue-50 rounded-xl transition-all"
                                    >
                                        Produk
                                    </a>
                                    <a
                                        href="#marketplace"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-3 py-4 text-base font-medium text-hy-dark hover:text-hy-blue hover:bg-blue-50 rounded-xl transition-all"
                                    >
                                        Marketplace
                                    </a>
                                    <a
                                        href="#tentang"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-3 py-4 text-base font-medium text-hy-dark hover:text-hy-blue hover:bg-blue-50 rounded-xl transition-all"
                                    >
                                        Tentang Kami
                                    </a>
                                </>
                            ) : (
                                <button
                                    onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                                    className="w-full text-left px-3 py-4 text-base font-medium text-hy-dark hover:text-hy-blue hover:bg-blue-50 rounded-xl transition-all flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Beranda
                                </button>
                            )}
                            <button
                                onClick={() => { setCurrentPage('affiliate'); setIsMenuOpen(false); }}
                                className={`w-full text-left px-3 py-4 text-base font-medium rounded-xl transition-all ${currentPage === 'affiliate' ? 'text-hy-blue bg-blue-50' : 'text-hy-dark hover:text-hy-blue hover:bg-blue-50'}`}
                            >
                                Affiliate Program
                            </button>
                            <div className="pt-4 px-3">
                                <a
                                    href={WA_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-hy-blue text-white px-5 py-4 rounded-xl font-bold shadow-lg shadow-hy-blue/20 flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" /> Hubungi Kami via WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
interface FooterProps {
    setCurrentPage: (p: Page) => void;
}

function Footer({ setCurrentPage }: FooterProps) {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
                        <img
                            src="/logo.png"
                            alt="Hygieniq Logo"
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const sibling = e.currentTarget.nextElementSibling as HTMLElement | null;
                                if (sibling) sibling.style.display = 'flex';
                            }}
                        />
                        <div className="hidden w-6 h-6 bg-hy-blue rounded items-center justify-center">
                            <ShieldCheck className="text-white w-4 h-4" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-hy-dark">
                            HYGIENIQ<span className="text-hy-blue">.</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-8 text-sm font-medium text-gray-500">
                        <button onClick={() => setCurrentPage('home')} className="hover:text-hy-blue transition-colors">Beranda</button>
                        <button onClick={() => setCurrentPage('affiliate')} className="hover:text-hy-blue transition-colors">Affiliate</button>
                        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-hy-blue transition-colors">Hubungi Kami</a>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="https://www.instagram.com/hygieniq.id" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-hy-blue transition-colors" aria-label="Instagram">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="https://www.facebook.com/hygieniq.id" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-hy-blue transition-colors" aria-label="Facebook">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-hy-blue transition-colors" aria-label="WhatsApp">
                            <MessageCircle className="w-5 h-5" />
                        </a>
                    </div>

                    <p className="text-sm text-gray-500">
                        © 2026 Hygieniq Indonesia. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

// ── HomePage ───────────────────────────────────────────────────────────────────
interface HomePageProps {
    setCurrentPage: (p: Page) => void;
}

function HomePage({ setCurrentPage }: HomePageProps) {
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-hy-blue text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-4 md:mb-5">
                                <Sparkles className="w-3 h-3" /> Modern Hygiene Solutions
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-hy-dark leading-tight mb-4 md:mb-5">
                                Menyederhanakan Kebersihan <br className="hidden sm:block" />
                                <span className="text-hy-blue">untuk Generasi Modern.</span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed px-4 md:px-0">
                                Hygieniq hadir untuk menyederhanakan rutinitas kebersihan Anda dengan produk berkualitas tinggi yang efektif, aman, dan dirancang khusus untuk gaya hidup generasi modern.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                                <a
                                    href="#produk"
                                    className="w-full sm:w-auto bg-hy-dark text-white px-6 py-3 md:px-7 md:py-3.5 rounded-full font-bold text-sm hover:bg-hy-dark/90 transition-all flex items-center justify-center gap-2"
                                >
                                    Lihat Produk <ArrowRight className="w-4 h-4" />
                                </a>
                                <a
                                    href="#marketplace"
                                    className="w-full sm:w-auto bg-white border-2 border-gray-100 text-hy-dark px-6 py-3 md:px-7 md:py-3.5 rounded-full font-bold text-sm hover:border-hy-blue hover:text-hy-blue transition-all flex items-center justify-center gap-2"
                                >
                                    Beli di Marketplace
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-hy-blue/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-96 h-96 bg-hy-blue/5 rounded-full blur-3xl"></div>
            </section>

            {/* Featured Product */}
            <section id="produk" className="py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
                        <motion.div
                            className="w-full md:flex-1 max-w-md md:max-w-sm lg:max-w-md"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative group">
                                <div className="absolute -inset-2 md:-inset-3 bg-hy-blue/10 rounded-3xl blur-xl group-hover:bg-hy-blue/20 transition-all"></div>
                                <img
                                    src={PRODUCT.image}
                                    alt={PRODUCT.name}
                                    className="relative rounded-2xl shadow-lg w-full object-cover aspect-square"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex-1 text-center md:text-left"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[10px] md:text-[11px] font-bold text-hy-blue uppercase tracking-widest mb-2">Produk Unggulan</h2>
                            <h3 className="text-2xl md:text-3xl font-bold text-hy-dark mb-4 md:mb-5">{PRODUCT.name}</h3>
                            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                                {PRODUCT.description}
                            </p>

                            <div className="space-y-3 md:space-y-3.5 mb-8 md:mb-10 inline-block text-left">
                                {PRODUCT.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-hy-blue" />
                                        </div>
                                        <span className="text-sm md:text-base text-gray-700 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-6">
                                <span className="text-2xl font-bold text-hy-dark">{PRODUCT.price}</span>
                                <a
                                    href="#marketplace"
                                    className="w-full sm:w-auto bg-hy-blue text-white px-6 py-3 md:px-7 md:py-2.5 rounded-xl font-bold text-sm hover:bg-hy-blue/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-hy-blue/30"
                                >
                                    Beli Sekarang <ShoppingBag className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Marketplace Section */}
            <section id="marketplace" className="py-16 md:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-2xl font-bold text-hy-dark mb-3 md:mb-4 text-center">Tersedia di Marketplace</h2>
                    <p className="text-sm md:text-base text-gray-600 mb-10 md:mb-14 max-w-2xl mx-auto px-4">
                        Dapatkan produk Hygieniq dengan mudah melalui marketplace favorit Anda di seluruh Indonesia.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                        {MARKETPLACES.map((mp, index) => (
                            <motion.a
                                key={index}
                                href={mp.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-3 md:gap-4 group"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl ${mp.color} flex items-center justify-center text-white shadow-inner`}>
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-sm text-hy-dark group-hover:text-hy-blue transition-colors">{mp.name}</span>
                                <div className="flex items-center gap-1 text-[10px] md:text-[11px] text-gray-400 font-medium">
                                    Kunjungi Toko <ExternalLink className="w-3 h-3" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Affiliate CTA Section */}
            <section className="py-16 md:py-20 bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-100/50 flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-hy-dark mb-4">Dapatkan Penghasilan Tambahan Bersama Hygieniq</h2>
                            <p className="text-gray-600 mb-0">
                                Bergabunglah dengan program affiliate kami dan dapatkan komisi hingga 20% untuk setiap penjualan yang Anda referensikan.
                            </p>
                        </div>
                        <button
                            onClick={() => setCurrentPage('affiliate')}
                            className="bg-hy-blue text-white px-8 py-4 rounded-full font-bold hover:bg-hy-blue/90 transition-all shadow-lg shadow-hy-blue/30 whitespace-nowrap flex items-center gap-2"
                        >
                            Pelajari Affiliate <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="tentang" className="py-16 md:py-20 bg-hy-dark text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="text-3xl md:text-3xl font-bold mb-6 md:mb-7">Tentang Hygieniq</h2>
                        <p className="text-base text-blue-100/80 mb-6 md:mb-7 leading-relaxed">
                            Hygieniq lahir dari keinginan untuk menyederhanakan kebersihan bagi masyarakat Indonesia. Kami percaya bahwa lingkungan yang bersih adalah fondasi dari kesehatan dan kebahagiaan bagi generasi modern.
                        </p>
                        <p className="text-base text-blue-100/80 mb-10 leading-relaxed">
                            Setiap produk kami diformulasikan dengan teliti menggunakan bahan-bahan yang efektif namun tetap aman bagi pengguna dan lingkungan.
                        </p>
                        <div className="grid grid-cols-2 gap-6 md:gap-10">
                            <div>
                                <div className="text-3xl font-bold text-hy-blue mb-1 md:mb-1.5">100%</div>
                                <div className="text-[10px] md:text-[11px] uppercase tracking-widest text-blue-200/60 font-bold">Kualitas Terjamin</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-hy-blue mb-1 md:mb-1.5">5+</div>
                                <div className="text-[10px] md:text-[11px] uppercase tracking-widest text-blue-200/60 font-bold">Marketplace Utama</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
                <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
            </section>
        </>
    );
}

// ── AffiliatePage ──────────────────────────────────────────────────────────────
function AffiliatePage() {
    return (
        <div className="bg-white">
            {/* Hero Affiliate */}
            <section className="pt-12 pb-20 md:pt-24 md:pb-32 bg-gradient-to-b from-blue-50 to-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-hy-blue text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-5">
                                <Users className="w-3 h-3" /> Hygieniq Affiliate Program
                            </span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-hy-dark leading-tight mb-6">
                                Raih Keuntungan Bersama <br />
                                <span className="text-hy-blue">Produk Kebersihan Modern.</span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed">
                                Jadilah bagian dari perjalanan Hygieniq. Bagikan solusi kebersihan modern kepada audiens Anda dan dapatkan komisi menarik untuk setiap transaksi yang berhasil.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="#cara-kerja"
                                    className="w-full sm:w-auto bg-hy-blue text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-hy-blue/30 hover:bg-hy-blue/90 transition-all flex items-center justify-center"
                                >
                                    Pelajari Cara Bergabung
                                </a>
                                <a
                                    href={WA_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto bg-white border-2 border-gray-200 text-hy-dark px-8 py-4 rounded-full font-bold hover:border-hy-blue hover:text-hy-blue transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-4 h-4" /> Tanya via WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-hy-blue/5 rounded-full blur-3xl"></div>
            </section>

            {/* Commission Highlights */}
            <section className="py-16 md:py-24 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-hy-blue mx-auto mb-6">
                                <Percent className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-hy-dark mb-3">Komisi Tinggi</h3>
                            <p className="text-gray-600 text-sm">
                                Dapatkan komisi mulai dari 5% hingga 20% untuk setiap produk yang terjual melalui link Anda.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-hy-blue mx-auto mb-6">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-hy-dark mb-3">Pembayaran Cepat</h3>
                            <p className="text-gray-600 text-sm">
                                Proses pencairan komisi yang transparan dan terjadwal langsung ke rekening Anda.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-hy-blue mx-auto mb-6">
                                <Rocket className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-hy-dark mb-3">Dukungan Penuh</h3>
                            <p className="text-gray-600 text-sm">
                                Kami menyediakan materi promosi lengkap mulai dari foto produk hingga konten video siap pakai.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="cara-kerja" className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-hy-dark mb-4">Cara Bergabung</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Hanya butuh 3 langkah mudah untuk mulai menghasilkan pendapatan pasif bersama Hygieniq.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -translate-y-1/2 z-0"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            {[
                                { step: "01", title: "Buka Dashboard Affiliate", desc: "Masuk ke dashboard affiliate di marketplace favorit Anda (Shopee, Tokopedia, TikTok, dll)." },
                                { step: "02", title: "Cari 'Hygieniq'", desc: "Ketik 'Hygieniq' di kolom pencarian toko atau produk pada platform affiliate tersebut." },
                                { step: "03", title: "Mulai Promosikan", desc: "Pilih produk Hygieniq, ambil link affiliate Anda, dan mulai bagikan untuk meraih komisi." }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                                    <div className="w-10 h-10 bg-hy-blue text-white rounded-full flex items-center justify-center font-bold mx-auto mb-6">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-hy-dark mb-3">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Instagram Reviews Preview */}
            <section className="py-16 md:py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                        <div className="max-w-2xl text-center md:text-left">
                            <h2 className="text-3xl font-bold text-hy-dark mb-4">Apa Kata Mereka?</h2>
                            <p className="text-gray-600">
                                Lihat ribuan review jujur dari para affiliate yang telah sukses mempromosikan produk Hygieniq di media sosial mereka.
                            </p>
                        </div>
                        <a
                            href="https://www.instagram.com/hygieniq.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-tr from-[#FFB353] via-[#FF2C7D] to-[#B300C3] text-white px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-pink-200"
                        >
                            <Instagram className="w-4 h-4" /> Lihat Semua Review di Instagram
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {REVIEWS.map((review, idx) => (
                            <motion.a
                                key={idx}
                                href="https://www.instagram.com/hygieniq.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <img
                                    src={review.img}
                                    alt={review.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                    <span className="text-white text-xs font-bold">{review.name}</span>
                                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                        <Play className="w-3 h-3 text-white fill-current" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                                        <Instagram className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Explanation */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-blue max-w-none">
                        <h2 className="text-3xl font-bold text-hy-dark mb-8 text-center">Mengapa Memilih Affiliate Hygieniq?</h2>
                        <div className="space-y-8">
                            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-hy-blue">
                                <h4 className="font-bold text-hy-dark mb-2">Produk Berkualitas &amp; Dibutuhkan</h4>
                                <p className="text-gray-600 text-sm">
                                    Produk kebersihan adalah kebutuhan pokok. Hygieniq menawarkan kualitas premium dengan harga yang kompetitif, sehingga lebih mudah untuk dipasarkan kepada siapa saja.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-hy-blue">
                                <h4 className="font-bold text-hy-dark mb-2">Sistem Tracking yang Akurat</h4>
                                <p className="text-gray-600 text-sm">
                                    Kami menggunakan teknologi pelacakan terbaru untuk memastikan setiap klik dan penjualan dari link Anda tercatat dengan benar tanpa ada yang terlewat.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-hy-blue">
                                <h4 className="font-bold text-hy-dark mb-2">Komisi Berjenjang (Tiered Commission)</h4>
                                <p className="text-gray-600 text-sm">
                                    Semakin banyak Anda menjual, semakin besar persentase komisi yang Anda dapatkan. Mulai dari 5% untuk pemula hingga 20% untuk mitra platinum kami.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 bg-hy-dark rounded-3xl p-8 md:p-12 text-center text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">Siap Memulai Perjalanan Anda?</h3>
                        <p className="text-blue-100/70 mb-10 max-w-xl mx-auto">
                            Cari <strong>"Hygieniq"</strong> di dashboard affiliate marketplace pilihan Anda sekarang dan jadilah bagian dari revolusi kebersihan modern.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-8 opacity-60">
                            <span className="text-xs font-bold px-3 py-1 border border-white/20 rounded-full">Shopee Affiliate</span>
                            <span className="text-xs font-bold px-3 py-1 border border-white/20 rounded-full">Tokopedia Affiliate</span>
                            <span className="text-xs font-bold px-3 py-1 border border-white/20 rounded-full">TikTok Shop Affiliate</span>
                        </div>
                        <a
                            href={WA_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-hy-blue text-white px-8 py-4 rounded-full font-bold hover:bg-hy-blue/90 transition-all shadow-lg shadow-hy-blue/30"
                        >
                            <MessageCircle className="w-5 h-5" /> Daftar via WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<Page>('home');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Navigation
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                setIsMenuOpen={setIsMenuOpen}
            />
            <main className="flex-grow">
                {currentPage === 'home'
                    ? <HomePage setCurrentPage={setCurrentPage} />
                    : <AffiliatePage />
                }
            </main>
            <Footer setCurrentPage={setCurrentPage} />
        </div>
    );
}
