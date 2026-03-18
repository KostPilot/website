import React from "react";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export default function PhoneMockup({ children, className = "" }: PhoneMockupProps) {
  return (
    <div
      className={`relative mx-auto w-[280px] shrink-0 sm:w-[300px] ${className}`}
    >
      {/* Phone shell */}
      <div className="relative rounded-[40px] border-[7px] border-[#1a1a1a] bg-[#1a1a1a] shadow-2xl">
        {/* Top bar with notch */}
        <div className="relative flex h-8 items-center justify-center rounded-t-[34px] bg-[#1a1a1a]">
          {/* Dynamic island / notch */}
          <div className="h-5 w-24 rounded-full bg-[#0a0a0a]" />
        </div>

        {/* Screen */}
        <div className="overflow-hidden rounded-b-[34px] bg-white">
          {children}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-2">
          <div className="h-1 w-24 rounded-full bg-[#444]" />
        </div>
      </div>
    </div>
  );
}
