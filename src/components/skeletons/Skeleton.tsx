import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'rounded' | 'circular' | 'text' | 'badge';
  width?: string | number;
  height?: string | number;
  animation?: 'shimmer' | 'pulse' | 'none';
  id?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rounded',
  width,
  height,
  animation = 'shimmer',
  id,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-xl';
      case 'rectangular':
        return 'rounded-none';
      case 'text':
        return 'rounded-md h-4 my-1';
      case 'badge':
        return 'rounded-md h-5 px-2.5';
      default:
        return 'rounded-xl';
    }
  };

  const getAnimationClass = () => {
    switch (animation) {
      case 'shimmer':
        return 'animate-shimmer';
      case 'pulse':
        return 'animate-pulse';
      case 'none':
        return '';
      default:
        return 'animate-shimmer';
    }
  };

  const inlineStyle: React.CSSProperties = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <div
      id={id}
      style={inlineStyle}
      className={`bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50 ${getVariantClass()} ${getAnimationClass()} ${className}`}
      aria-hidden="true"
      role="status"
    />
  );
};

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
  lastLineWidth = '65%',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLast = index === lines - 1;
        return (
          <Skeleton
            key={index}
            variant="text"
            className="w-full h-3.5"
            style={isLast ? { width: lastLineWidth } : undefined}
          />
        );
      })}
    </div>
  );
};

export interface SkeletonBadgeProps {
  className?: string;
  width?: string;
}

export const SkeletonBadge: React.FC<SkeletonBadgeProps> = ({
  className = '',
  width = '4.5rem',
}) => {
  return (
    <Skeleton
      variant="badge"
      className={`h-5 ${className}`}
      style={{ width }}
    />
  );
};

export interface SkeletonButtonProps {
  className?: string;
  width?: string;
  height?: string;
}

export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  className = '',
  width = '6.5rem',
  height = '2.25rem',
}) => {
  return (
    <Skeleton
      variant="rounded"
      className={`${className}`}
      style={{ width, height }}
    />
  );
};
