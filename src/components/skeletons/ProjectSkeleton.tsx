import React from 'react';
import { Skeleton, SkeletonBadge } from './Skeleton';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xs">
      <div className="space-y-4">
        {/* Meta Badge & Year Row */}
        <div className="flex items-center justify-between">
          <Skeleton variant="badge" className="w-24 h-6" />
          <Skeleton variant="text" className="w-12 h-4" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <Skeleton variant="text" className="w-4/5 h-6" />
          <Skeleton variant="text" className="w-1/2 h-3.5" />
        </div>

        {/* Description Paragraph */}
        <div className="space-y-2 pt-1">
          <Skeleton variant="text" className="w-full h-3.5" />
          <Skeleton variant="text" className="w-11/12 h-3.5" />
          <Skeleton variant="text" className="w-3/4 h-3.5" />
        </div>

        {/* Architecture Details Box */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-100 dark:border-zinc-800/80 space-y-2">
          <div className="flex items-center gap-1.5">
            <Skeleton variant="circular" className="w-3 h-3" />
            <Skeleton variant="text" className="w-36 h-3" />
          </div>
          <Skeleton variant="text" className="w-full h-3" />
          <Skeleton variant="text" className="w-4/5 h-3" />
        </div>

        {/* Highlights Bullet Rows */}
        <div className="space-y-2 pt-1">
          <div className="flex items-start gap-2">
            <Skeleton variant="circular" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <Skeleton variant="text" className="w-full h-3" />
          </div>
          <div className="flex items-start gap-2">
            <Skeleton variant="circular" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <Skeleton variant="text" className="w-5/6 h-3" />
          </div>
          <div className="flex items-start gap-2">
            <Skeleton variant="circular" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <Skeleton variant="text" className="w-3/4 h-3" />
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          <SkeletonBadge className="w-16 h-5" />
          <SkeletonBadge className="w-20 h-5" />
          <SkeletonBadge className="w-14 h-5" />
          <SkeletonBadge className="w-16 h-5" />
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
        <Skeleton variant="rounded" className="w-36 h-6" />
        <div className="flex items-center gap-2">
          <Skeleton variant="rounded" className="w-7 h-7" />
          <Skeleton variant="rounded" className="w-20 h-7" />
        </div>
      </div>
    </div>
  );
};

export const ProjectsGridSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-full">
          <ProjectCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export const LiveDeploymentsSkeleton: React.FC = () => {
  return (
    <div className="mt-14 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" className="w-2 h-2" />
          <Skeleton variant="text" className="w-64 h-4" />
        </div>
        <Skeleton variant="text" className="w-28 h-3.5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col justify-between gap-4 shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton variant="badge" className="w-28 h-5" />
                <Skeleton variant="text" className="w-24 h-3" />
              </div>
              <Skeleton variant="text" className="w-3/4 h-5" />
              <Skeleton variant="text" className="w-1/2 h-3.5" />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <Skeleton variant="text" className="w-16 h-3.5" />
              <Skeleton variant="rounded" className="w-28 h-7" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
