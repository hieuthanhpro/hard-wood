"use client";

import type { FormEvent, ReactNode } from "react";
import type { HomeBlockContent } from "@/lib/home-blocks-types";
import { Calendar } from "lucide-react";

interface FieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  icon?: ReactNode;
}

export function FreeConsultationSection({ block }: { block?: HomeBlockContent }) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const header = block?.header ?? "BOOK YOUR SHOWROOM VISIT";
  const ctaLabel = block?.ctaLabel ?? "Send";

  const Field = ({ label, type, name, placeholder, required = true, icon }: FieldProps) => (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-bold text-gray-800">{label}</label>
      <div className="relative flex items-center">
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-200 bg-[#fcfcfc] px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#ff6b00] focus:outline-none focus:ring-1 focus:ring-[#ff6b00]"
        />
        {icon && (
          <div className="pointer-events-none absolute right-4 text-gray-800">
            {icon}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="w-full min-w-0 bg-[#514E26] py-16 lg:py-24">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-['Be_Vietnam'] text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl lg:text-[34px]">
            {header}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-['Abramo'] text-[15px] leading-relaxed text-white/90 sm:text-[17px]">
            Fill out the form below and our team will get back to you quickly.<br className="hidden sm:block" />
            It only takes 30 seconds.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-2xl sm:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Field 
              label="Full Name" 
              name="fullName" 
              type="text" 
              placeholder="John Doe" 
            />
            <Field 
              label="Email Address" 
              name="email" 
              type="email" 
              placeholder="john@example.com" 
            />
            <Field 
              label="Phone Number" 
              name="phone" 
              type="tel" 
              placeholder="+1 (555) 000-0000" 
            />
            <Field 
              label="Preferred Visit Date (optional)" 
              name="preferredDate" 
              type="date" 
              placeholder="" 
              required={false}
            />

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-md bg-[#ff6b00] py-4 text-[16px] font-semibold tracking-wide text-white shadow-md transition hover:brightness-95"
              >
                {ctaLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
