"use client";

import Link from "next/link";
import * as React from "react";

interface NavProps {
  items?: {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

function MobileItems(props: NavProps) {
  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 bg-white shadow-md md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md p-4">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {props.items?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function DesktopItems(props: NavProps) {
  return (
    <nav className="hidden gap-6 md:flex">
      {props.items?.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex items-center text-lg font-medium hover:text-black"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default function LandingPageHeader() {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header className="fixed w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <div className="text-xl font-bold">Noha.AI</div>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-lg font-medium hover:text-gray-800">
            Home
          </Link>
          <Link href="#product" className="text-lg font-medium hover:text-gray-800">
            Product
          </Link>
          <Link href="#about" className="text-lg font-medium hover:text-gray-800">
            About
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <button className="hidden md:block px-4 py-2 bg-black text-white text-lg font-small rounded-lg">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="hidden md:block px-4 py-2 bg-black text-white text-lg font-small rounded-lg">
              Signup
            </button>
          </Link>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden"
          >
          </button>
        </div>
        {showMobileMenu && (
          <MobileItems
            items={[
              { title: "Home", href: "/" },
              { title: "Product", href: "#product" },
              { title: "About", href: "#about" },
            ]}
          />
        )}
      </div>
    </header>
  );
}