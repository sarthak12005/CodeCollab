// src/components/ActivitySidebar.js
import React from 'react';
import { Target, CheckCircle, X, Bookmark } from 'lucide-react';

const ActivitySidebar = () => {
    const progressData = {
        todayGoal: {
            completed: 2,
            total: 5,
            percentage: 40
        },
        currentStreak: 3,
        difficulty: {
            easy: 40,
            medium: 35,
            hard: 25
        }
    };

    const recentActivity = [
        {
            id: 1,
            type: 'solved',
            problem: 'Valid Parentheses',
            time: '2 hours ago',
            icon: CheckCircle,
            color: 'text-green-400'
        },
        {
            id: 2,
            type: 'attempted',
            problem: 'Merge k Sorted Lists',
            time: 'Yesterday',
            icon: X,
            color: 'text-red-400'
        },
        {
            id: 3,
            type: 'bookmarked',
            problem: 'Two Sum',
            time: 'Yesterday',
            icon: Bookmark,
            color: 'text-purple-400'
        }
    ];

    const problemOfTheDay = {
        title: 'Maximum Subarray',
        difficulty: 'Medium',
        acceptance: '82%'
    };

    // Create SVG circle progress
    const createCircleProgress = (percentage, size = 120, strokeWidth = 8) => {
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

        return {
            size,
            strokeWidth,
            radius,
            strokeDasharray,
            center: size / 2
        };
    };

    const goalProgress = createCircleProgress(progressData.todayGoal.percentage);
    const easyProgress = createCircleProgress(progressData.difficulty.easy, 80, 6);
    const mediumProgress = createCircleProgress(progressData.difficulty.medium, 80, 6);
    const hardProgress = createCircleProgress(progressData.difficulty.hard, 80, 6);

    return (
        <div className="w-80 bg-[#0a0a12] text-white p-6 ">
            {/* Today's Goal */}
            <div className="mb-8">

                <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">
                            {progressData.todayGoal.completed}/{progressData.todayGoal.total} problems
                        </span>
                        <span className="text-purple-400 font-medium">
                            {progressData.todayGoal.percentage}% Complete
                        </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm">
                            Current streak: {progressData.currentStreak} days
                        </span>
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
                            View Stats
                        </button>
                    </div>

                    {/* Progress Circle */}
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <svg width={goalProgress.size} height={goalProgress.size} className="transform -rotate-90">
                                <circle
                                    cx={goalProgress.center}
                                    cy={goalProgress.center}
                                    r={goalProgress.radius}
                                    stroke="rgb(51, 65, 85)"
                                    strokeWidth={goalProgress.strokeWidth}
                                    fill="none"
                                />
                                <circle
                                    cx={goalProgress.center}
                                    cy={goalProgress.center}
                                    r={goalProgress.radius}
                                    stroke="rgb(147, 51, 234)"
                                    strokeWidth={goalProgress.strokeWidth}
                                    fill="none"
                                    strokeDasharray={goalProgress.strokeDasharray}
                                    strokeLinecap="round"
                                    className="transition-all duration-500"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">{progressData.todayGoal.percentage}%</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors">
                        Solve Now
                    </button>
                </div>
            </div>

            {/* Problem of the Day */}
            <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                    <Target className="w-4 h-4 text-yellow-400" />
                    <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">PROBLEM OF THE DAY</h3>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <h4 className="font-medium text-white">{problemOfTheDay.title}</h4>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                        <span className="text-yellow-400">{problemOfTheDay.difficulty}</span>
                        <span className="text-gray-400">{problemOfTheDay.acceptance} Acceptance</span>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                        Find the contiguous subarray which has the largest sum.
                    </p>
                </div>
            </div>

            {/* Difficulty Distribution */}
            <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-4">DIFFICULTY DISTRIBUTION</h3>

                <div className="grid grid-cols-3 gap-4">
                    {/* Easy */}
                    <div className="text-center">
                        <div className="relative mb-2">
                            <svg width={easyProgress.size} height={easyProgress.size} className="transform -rotate-90">
                                <circle
                                    cx={easyProgress.center}
                                    cy={easyProgress.center}
                                    r={easyProgress.radius}
                                    stroke="rgb(51, 65, 85)"
                                    strokeWidth={easyProgress.strokeWidth}
                                    fill="none"
                                />
                                <circle
                                    cx={easyProgress.center}
                                    cy={easyProgress.center}
                                    r={easyProgress.radius}
                                    stroke="rgb(34, 197, 94)"
                                    strokeWidth={easyProgress.strokeWidth}
                                    fill="none"
                                    strokeDasharray={easyProgress.strokeDasharray}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div className="text-green-400 font-medium text-sm">Easy: {progressData.difficulty.easy}%</div>
                    </div>

                    {/* Medium */}
                    <div className="text-center">
                        <div className="relative mb-2">
                            <svg width={mediumProgress.size} height={mediumProgress.size} className="transform -rotate-90">
                                <circle
                                    cx={mediumProgress.center}
                                    cy={mediumProgress.center}
                                    r={mediumProgress.radius}
                                    stroke="rgb(51, 65, 85)"
                                    strokeWidth={mediumProgress.strokeWidth}
                                    fill="none"
                                />
                                <circle
                                    cx={mediumProgress.center}
                                    cy={mediumProgress.center}
                                    r={mediumProgress.radius}
                                    stroke="rgb(251, 191, 36)"
                                    strokeWidth={mediumProgress.strokeWidth}
                                    fill="none"
                                    strokeDasharray={mediumProgress.strokeDasharray}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div className="text-yellow-400 font-medium text-sm">Medium: {progressData.difficulty.medium}%</div>
                    </div>

                    {/* Hard */}
                    <div className="text-center">
                        <div className="relative mb-2">
                            <svg width={hardProgress.size} height={hardProgress.size} className="transform -rotate-90">
                                <circle
                                    cx={hardProgress.center}
                                    cy={hardProgress.center}
                                    r={hardProgress.radius}
                                    stroke="rgb(51, 65, 85)"
                                    strokeWidth={hardProgress.strokeWidth}
                                    fill="none"
                                />
                                <circle
                                    cx={hardProgress.center}
                                    cy={hardProgress.center}
                                    r={hardProgress.radius}
                                    stroke="rgb(239, 68, 68)"
                                    strokeWidth={hardProgress.strokeWidth}
                                    fill="none"
                                    strokeDasharray={hardProgress.strokeDasharray}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div className="text-red-400 font-medium text-sm">Hard: {progressData.difficulty.hard}%</div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            {/* <div>
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-4">RECENT ACTIVITY</h3>
                <div className="space-y-3">
                    {recentActivity.map((activity) => {
                        const IconComponent = activity.icon;
                        return (
                            <div key={activity.id} className="flex items-center space-x-3">
                                <IconComponent className={`w-4 h-4 ${activity.color}`} />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-white">
                                            {activity.type === 'solved' ? 'You solved' :
                                                activity.type === 'attempted' ? 'Attempted' : 'Bookmarked'}
                                        </span>
                                        <span className="text-sm font-medium text-blue-400">
                                            {activity.problem}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400">{activity.time}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div> */}
        </div>
    );
};

export default ActivitySidebar;