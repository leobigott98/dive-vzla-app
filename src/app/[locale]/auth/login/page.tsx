"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
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
          <h2 className="text-2xl font-bold">Inicia sesión</h2>
          <p className="text-gray-400">¡Hola de nuevo!</p>

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

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-yellow-500" />
              <span>Mantener mi sesión iniciada</span>
            </label>
            <Link href="/forgot-password" className="text-yellow-500 hover:underline">
              He olvidado mi contraseña
            </Link>
          </div>

          {/* Login Button */}
          <button className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-semibold">
            Inicia sesión
          </button>

          {/* Sign Up Link */}
          <p className="text-sm text-gray-400 text-center">
            ¿Todavía no tienes una cuenta?{" "}
            <Link href="/auth/sign-up" className="text-yellow-500 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
