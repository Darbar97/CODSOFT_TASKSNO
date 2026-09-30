import React from 'react';
import { Skeleton, SkeletonBadge } from './Skeleton';

export const SkillCategorySkeleton: React.FC = () => {
  return (
    <div className="bg-[#f7f8f3] dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-xs h-full">
      <div className="space-y-4">
        {/* Category Header */}
        <div className="border-b border-zinc-200/70 dark:border-zinc-800 pb-3 flex items-center justify-between">
          <div className="space-y-1.5 flex-1 pr-4">
            <Skeleton variant="text" className="w-48 h-5" />
            <Skeleton variant="text" className="w-5/6 h-3.5" />
          </div>
          <Skeleton variant="badge" className="w-14 h-5" />
        </div>

        {/* Skills Grid Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton variant="rounded" className="w-6 h-6" />
                  <Skeleton variant="text" className="w-24 h-4" />
                </div>
                <SkeletonBadge className="w-14 h-4" />
              </div>
              <Skeleton variant="text" className="w-4/5 h-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SkillsGridSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-full">
          <SkillCategorySkeleton />
        </div>
      ))}
    </div>
  );
};
