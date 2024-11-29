import React from 'react';
import Header from '../components/Header';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  pageName: string;
}

export default function ComingSoon({ pageName }: ComingSoonProps) {
  const title = pageName
    .split(/(?=[A-Z])/)
    .join(' ')
    .replace(/^\w/, c => c.toUpperCase());

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
          <Construction className="w-16 h-16 text-emerald-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-600">
            We're working hard to bring you the {title.toLowerCase()} feature.
          </p>
        </div>
      </main>
    </>
  );
}