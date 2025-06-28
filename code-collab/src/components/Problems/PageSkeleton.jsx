import React from 'react';
import ProblemSkeletonCard from './ProblemSkeletonCard';

const PageSkeleton = () => (
  <div className="p-6 space-y-6 animate-pulse">
    {/* Dropdown Skeleton */}
    <div className="flex justify-end">
      <div className="h-10 w-36 bg-slate-700 rounded" />
    </div>

    {/* Problem Cards Skeleton */}
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <ProblemSkeletonCard key={index} />
      ))}
    </div>

    {/* Load More Button Skeleton */}
    <div className="flex justify-center">
      <div className="h-12 w-48 bg-slate-700 rounded" />
    </div>
  </div>
);

export default PageSkeleton;
