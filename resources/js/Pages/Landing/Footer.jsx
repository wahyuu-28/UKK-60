import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Kolom 1: Branding */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-blue-600">PeaceSchool</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Membangun sekolah yang lebih nyaman melalui transparansi dan kolaborasi antara siswa dan pihak sekolah.
                    </p>
                </div>

                {/* Kolom 2: Navigasi */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-6">Navigasi</h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li className="hover:text-blue-600 cursor-pointer">Beranda</li>
                        <li className="hover:text-blue-600 cursor-pointer">Aspirasi Terbaru</li>
                    </ul>
                </div>

                {/* Kolom 3: Bantuan */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-6">Bantuan</h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li className="hover:text-blue-600 cursor-pointer">Pusat Bantuan</li>
                        <li className="hover:text-blue-600 cursor-pointer">Ketentuan Layanan</li>
                        <li className="hover:text-blue-600 cursor-pointer">Kebijakan Privasi</li>
                        <li className="hover:text-blue-600 cursor-pointer">FAQ</li>
                    </ul>
                </div>

                {/* Kolom 4: Kontak Kami */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-6">Kontak Kami</h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li className="flex items-center">
                            <span className="mr-2"><IoLocationSharp/></span>
                            Jl. Veteran No.1A, RT.005/RW.002, Babakan, Kec. Tangerang, Kota Tangerang, Banten 15118
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2"><FaPhoneAlt/></span>
                            (021) 5523429
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2"><MdEmail/></span>
                            kontak@peaceschool.id
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright Line */}
            <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <p>© 2026 SMKN 4 Kota Tangerang Indonesia. Seluruh hak cipta dilindungi.</p>
                <div className="flex space-x-4">
                    <span>Indonesia</span>
                    <span>Bahasa Indonesia</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
