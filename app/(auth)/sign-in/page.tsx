"use client";

import { SignInForm } from "@/modules/auth/components/sign-in-form";
import Image from "next/image";

/**
 * Sign in page for Career Match Solutions
 */
export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <Image
                  src="/logo.svg"
                  alt="Career Match Solutions"
                  width={40}
                  height={40}
                  className="brightness-0 invert"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Effortless Hiring
              </span>
            </h1>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
              Let AI handle the busywork. You focus on people. Transform your
              hiring process with intelligent automation.
            </p>
          </div>

          {/* Form */}
          <div className="mt-8">
            <SignInForm />
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            <p>Career Match Solutions - AI-Powered Recruitment Ecosystem</p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              🚀 Enterprise subscription active and operational
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Intelligent
              <br />
              Recruitment
              <br />
              Ecosystem
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-lg">
              Access advanced AI-powered hiring and sales automation tools
              designed for enterprise-level performance.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            {[
              {
                icon: "⏱️",
                title: "95% Time Reduction",
                description:
                  "Automated screening and lead generation processes",
              },
              {
                icon: "👥",
                title: "Intelligent Matching",
                description: "AI-powered resume analysis with 98% accuracy",
              },
              {
                icon: "🎯",
                title: "3x Performance Improvement",
                description:
                  "Triple the qualified candidate and lead generation rates",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">1,000+</div>
              <div className="text-sm text-white/80">Organization Leads</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">20K+</div>
              <div className="text-sm text-white/80">Profiles Processed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">95%</div>
              <div className="text-sm text-white/80">Efficiency Gain</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">3.2x</div>
              <div className="text-sm text-white/80">ROI Increase</div>
            </div>
          </div>
        </div>

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
