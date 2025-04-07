// app/admin/layout.jsx
'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-white text-[#060b1f] flex flex-col">
      <main className="flex-1">{children}</main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}