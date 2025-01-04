// app/components/PlainHeader.tsx
"use client";

export default function PlainHeader() {
  return (
    <header className="fixed w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <div className="text-xl font-bold">Noha.AI</div>
      </div>
    </header>
  );
}
