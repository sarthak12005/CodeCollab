import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { LoadingSpinner } from '../../components/Admin/Common/LoadingSpinner';
import { useTheme } from '../../context/ThemeContext';
import { Users, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProblems: 0,
    totalSubmissions: 0,
    averageDifficulty: 'Medium',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 1234,
        totalProblems: 156,
        totalSubmissions: 8934,
        averageDifficulty: 'Medium',
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <LoadingSpinner size="lg"/>
      </AdminLayout>
    );
  }

  const StatCard = ({ title, value, description, icon: Icon, color }) => (
    <div
      className={`${theme.bg.secondary} rounded-xl shadow-lg p-6 border ${theme.border.primary} hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`${theme.text.secondary} text-sm font-medium mb-1`}>{title}</p>
          <p className={`text-4xl font-bold ${theme.text.primary} mb-3`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className={`${theme.text.tertiary} text-xs`}>{description}</p>
        </div>
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} description="Active users in the platform" icon={Users} color="bg-gradient-to-br from-blue-500 to-blue-600" />
          <StatCard title="Total Problems" value={stats.totalProblems} description="Available coding problems" icon={BookOpen} color="bg-gradient-to-br from-green-500 to-green-600" />
          <StatCard title="Total Submissions" value={stats.totalSubmissions} description="Code submissions by users" icon={CheckCircle} color="bg-gradient-to-br from-purple-500 to-purple-600" />
          <StatCard title="Avg Difficulty" value="Med" description="Average problem difficulty" icon={TrendingUp} color="bg-gradient-to-br from-orange-500 to-orange-600" />
        </div>

        <div className={`${theme.bg.secondary} rounded-xl shadow-lg p-8 border ${theme.border.primary}`}>
          <h2 className={`text-2xl font-bold ${theme.text.primary} mb-6`}>System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-opacity-20 border-gray-400">
                <span className={theme.text.secondary}>Platform Users</span>
                <span className={`text-lg font-bold ${theme.text.primary}`}>{stats.totalUsers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-opacity-20 border-gray-400">
                <span className={theme.text.secondary}>Active Problems</span>
                <span className={`text-lg font-bold ${theme.text.primary}`}>{stats.totalProblems}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-opacity-20 border-gray-400">
                <span className={theme.text.secondary}>Total Submissions</span>
                <span className={`text-lg font-bold ${theme.text.primary}`}>{stats.totalSubmissions.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={theme.text.secondary}>Success Rate</span>
                <span className={`text-lg font-bold text-green-500`}>78.5%</span>
              </div>
            </div>

            <div className={`${theme.bg.tertiary} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${theme.text.primary} mb-4`}>Admin Tips</h3>
              <ul className={`space-y-3 text-sm ${theme.text.secondary}`}>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>Review user submissions regularly for quality control</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>Keep problem difficulty levels balanced</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>Monitor system performance and user feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
