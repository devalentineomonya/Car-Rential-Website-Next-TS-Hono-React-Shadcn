import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-10">
      <div className="max-w-3xl w-full text-center space-y-6">
        {/* Animated 404 Number */}
        <div className="relative inline-block">
          <span className="text-[10rem] font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            404
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-2xl rounded-full" />
        </div>


        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            Lost in Space?
          </h1>
          <p className="text-xl text-slate-600 max-w-md mx-auto">
            Don't worry, even the best explorers get lost sometimes. Let's get you back on track!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Beam Me Home
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
          >
            <span className="hidden sm:inline">Or</span> Contact Support
          </Link>
        </div>


      </div>
    </div>
  );
};

export default NotFound;
