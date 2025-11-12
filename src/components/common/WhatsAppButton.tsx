// src/components/common/WhatsAppButton.tsx
"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/94706706101"
      target="_blank"
      className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition"
      aria-label="WhatsApp"
    >
      <FaWhatsapp size={28} className="text-white" />
    </Link>
  );
}
