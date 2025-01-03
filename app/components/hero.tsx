import Link from "next/link";

export default function Hero() {
  return (
    <section className="space-y-6 py-32 md:py-48 lg:py-52 bg-gray-50">
      <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-bold text-3xl sm:text-5xl lg:text-7xl">
          Noha.AI
        </h1>
        <p className="max-w-[42rem] leading-normal text-gray-600 sm:text-xl sm:leading-8">
        An Al technical interviewer that conducts deep-dive, human-like conversational interviews as per the company set bar & competency to identify top talents effortlessly. Say goodbye to manual interviews and hello to Noha
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="https://www.youtube.com/watch?v=D_RWdG1eIAc&feature=youtu.be"
            className="px-6 py-3 bg-black text-white text-lg font-medium rounded-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Our Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
