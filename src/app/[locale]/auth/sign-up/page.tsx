"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen">
      {/* Left Image Section */}
      <div className="hidden lg:flex w-9/10 bg-yellow-400 relative">
        <Image
          src="/images/header/banner_01.webp"
          width={1920}
          height={1080}
          alt="Sign up background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-black text-white p-8">
        <div className="max-w-sm w-full space-y-6">
          <h2 className="text-2xl font-bold">Crea una cuenta</h2>
          <p className="text-gray-400">Únete y comienza a explorar</p>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="tucorreo@mail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
            />
          </div>

          {/* Sign Up Button */}
          <button className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-semibold">
            Registrarse
          </button>

          {/* Login Link */}
          <p className="text-sm text-gray-400 text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-yellow-500 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
