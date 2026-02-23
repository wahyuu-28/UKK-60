import React from 'react';
import { Image } from 'lucide-react'; // Opsional: pake lucide-react biar makin cakep

export default function Form() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-2xl">
        <form className="space-y-6">

          {/* Grid Row 1: Subject & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-600 ml-1">Subject</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-600 ml-1">Category</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          </div>

          {/* Grid Row 2: Location & Urgensy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-600 ml-1">Location</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-600 ml-1">Urgensy</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          </div>

          {/* Description Row */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-600 ml-1">Description</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            ></textarea>
          </div>

          {/* Upload Image Section */}
          <div className="mt-4">
            <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="bg-blue-200 p-3 rounded-full mb-2">
                  <Image className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-bold text-black">upload image</p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>

        </form>
      </div>
    </div>
  );
};
