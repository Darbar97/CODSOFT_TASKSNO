import React from 'react';
import { Skeleton, SkeletonBadge } from './Skeleton';

export const CertificationCardSkeleton: React.FC = () => {
  return (
    <div className="h-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-xs">
      <div className="space-y-4">
        {/* Header Row: Issuer Badge & Issue Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton variant="rounded" className="w-7 h-7" />
            <Skeleton variant="badge" className="w-28 h-6" />
          </div>
          <Skeleton variant="text" className="w-28 h-3.5" />
        </div>

        {/* Title & Badge */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Skeleton variant="text" className="w-5/6 h-5" />
            <Skeleton variant="badge" className="w-20 h-5 shrink-0" />
          </div>
          <Skeleton variant="text" className="w-2/3 h-5" />
        </div>

        {/* Modules & Signatory tags */}
        <div className="flex flex-wrap gap-2">
          <Skeleton variant="badge" className="w-36 h-5" />
          <Skeleton variant="badge" className="w-32 h-5" />
        </div>

        {/* Description */}
        <div className="space-y-2 pt-1">
          <Skeleton variant="text" className="w-full h-3.5" />
          <Skeleton variant="text" className="w-11/12 h-3.5" />
          <Skeleton variant="text" className="w-3/4 h-3.5" />
        </div>

        {/* Curriculum & Skills Covered Tags */}
        <div className="space-y-2 pt-1">
          <Skeleton variant="text" className="w-36 h-3" />
          <div className="flex flex-wrap gap-1.5">
            <SkeletonBadge className="w-28 h-5" />
            <SkeletonBadge className="w-20 h-5" />
            <SkeletonBadge className="w-24 h-5" />
            <SkeletonBadge className="w-32 h-5" />
            <SkeletonBadge className="w-20 h-5" />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
        <Skeleton variant="rounded" className="w-28 h-7" />
        <div className="flex items-center gap-1.5">
          <Skeleton variant="circular" className="w-3.5 h-3.5" />
          <Skeleton variant="text" className="w-28 h-3" />
        </div>
      </div>
    </div>
  );
};

export const CertificationsGridSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-full">
          <CertificationCardSkeleton />
        </div>
      ))}
    </div>
  );
};
