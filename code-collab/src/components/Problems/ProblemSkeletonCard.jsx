import React from 'react';

const ProblemSkeletonCard = () => {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 animate-pulse space-y-4 w-[850px]">
            <div className="h-5 bg-slate-600 rounded w-1/3"></div>

            <div className="flex items-center space-x-3">
                <div className="h-4 bg-slate-700 rounded w-20"></div>
                <div className="h-4 bg-slate-700 rounded w-20"></div>
                <div className="h-4 bg-slate-700 rounded w-16"></div>
            </div>

            <div className="space-y-2">
                <div className="h-3 bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                <div className="h-3 bg-slate-700 rounded w-3/4"></div>
            </div>
        </div>
    );
};

export default ProblemSkeletonCard;
