"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
      {/* Background Glow */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Animated Circles */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute left-20 top-24 h-5 w-5 rounded-full bg-orange-400"
      />

      <motion.div
        animate={{
          y: [0, 25, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute bottom-28 right-24 h-6 w-6 rounded-full bg-sky-400"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
        }}
        className="relative z-10 max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl"
      >
        {/* 404 */}
        <motion.h1
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 bg-clip-text text-8xl font-extrabold text-transparent md:text-9xl"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
          }}
          className="mt-6 text-3xl font-bold text-white"
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
          }}
          className="mt-4 text-gray-300 leading-7"
        >
          The page you&#39;re looking for might have been removed, renamed, or
          is temporarily unavailable. Please check the URL or return to the
          homepage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
          }}
          className="mt-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600"
          >
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
