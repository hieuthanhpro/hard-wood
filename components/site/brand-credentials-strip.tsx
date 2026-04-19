import { Check } from "lucide-react";

function WorkSafeBcLogo() {
  return (
    <div
      className="flex h-[52px] min-w-[128px] overflow-hidden rounded-sm shadow-sm ring-1 ring-black/10"
      aria-label="WorkSafeBC"
    >
      <div className="flex flex-1 flex-col justify-center bg-black px-2.5 py-1.5 text-[10px] font-black uppercase leading-tight tracking-wide text-white">
        <span>Work</span>
        <span>Safe</span>
      </div>
      <div className="flex w-11 items-center justify-center bg-[#ff6600] text-sm font-black text-white">BC</div>
    </div>
  );
}

function NwfaLogo() {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-serif text-3xl font-semibold italic tracking-tight text-[#4a3728]">nwfa</span>
      <span className="mt-0.5 max-w-[140px] text-[9px] font-medium uppercase leading-snug tracking-wide text-[#2f6f4f]">
        National Wood Flooring Association
      </span>
    </div>
  );
}

function LicensedSeal() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] border-[#1f8f4a] bg-white shadow-sm">
        <Check className="size-8 text-[#1f8f4a]" strokeWidth={3} aria-hidden />
      </div>
      <span className="max-w-[104px] text-center text-[8px] font-bold uppercase leading-tight tracking-wide text-neutral-700">
        Licensed Bonded Insured
      </span>
    </div>
  );
}

export function BrandCredentialsStrip() {
  return (
    <section className="w-full bg-white py-10 lg:py-12">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-10 px-4 sm:px-6 md:gap-14">
        <WorkSafeBcLogo />
        <NwfaLogo />
        <LicensedSeal />
      </div>
    </section>
  );
}
