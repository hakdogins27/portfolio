import React from 'react';

export const IdentityInfo = ({ identity }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 sm:gap-y-4 text-[12px] sm:text-[13px] text-text-primary/90 font-medium">
      <div className="flex gap-3 sm:gap-4 items-center">
        <span className="text-text-muted w-12 sm:w-16 uppercase tracking-wider text-[10px] font-bold">loc:</span>
        <span className="truncate">{identity.location}</span>
      </div>
      <div className="flex gap-3 sm:gap-4 items-center">
        <span className="text-text-muted w-12 sm:w-16 uppercase tracking-wider text-[10px] font-bold">email:</span>
        <span className="hover:text-accent-orange cursor-pointer underline decoration-text-muted/30 truncate flex-1">{identity.email}</span>
      </div>
      <div className="flex gap-3 sm:gap-4 items-center">
        <span className="text-text-muted w-12 sm:w-16 uppercase tracking-wider text-[10px] font-bold">phone:</span>
        <span className="hover:text-accent-orange cursor-pointer decoration-text-muted/30 truncate flex-1">{identity.phone}</span>
      </div>
      <div className="flex gap-3 sm:gap-4 items-center">
        <span className="text-text-muted w-12 sm:w-16 uppercase tracking-wider text-[10px] font-bold">gh:</span>
        <span className="hover:text-accent-blue cursor-pointer underline decoration-text-muted/30 truncate text-xs sm:text-[13px] flex-1">{identity.github}</span>
      </div>
    </div>
  );
};
