// app/admin/layout.jsx
'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#b6b6b6] text-[#060b1f] flex flex-col">
      <main className="flex-1 p-10 max-sm:p-5">{children}</main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}