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

export function LookingForFloorSection() {
  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:mb-14">
          <WorkSafeBcLogo />
          <NwfaLogo />
          <LicensedSeal />
        </div>

        <h2 className="max-w-3xl text-2xl font-bold uppercase leading-tight tracking-wide text-black sm:text-3xl lg:text-[2rem]">
          Looking for a new floor?
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
          Most flooring items are available within 48 hrs. Custom, or products delivered from outside the province
          of BC, will take longer. We&apos;ll help you plan ahead.
        </p>

        <button
          type="button"
          className="mt-10 rounded-md bg-[#ff7828] px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 sm:px-12 sm:text-base"
        >
          Inquire here
        </button>
      </div>
    </section>
  );
}
