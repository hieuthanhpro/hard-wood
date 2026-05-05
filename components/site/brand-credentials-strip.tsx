import Image from "next/image";

export function BrandCredentialsStrip() {
  return (
    <section className="w-full bg-white py-10 lg:py-12">
      <div className="mx-auto flex max-w-4xl items-center justify-center px-4 sm:px-6">
        <Image
          src="/figma/logo-3.svg"
          alt="WorkSafeBC, NWFA, Licensed/Bonded/Insured"
          width={762}
          height={67}
          className="h-auto w-full max-w-[762px]"
          priority
        />
      </div>
    </section>
  );
}
