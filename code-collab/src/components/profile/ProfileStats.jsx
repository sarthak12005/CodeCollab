const StatCard = ({ icon: Icon, value, label, color }) => {
  return (
    <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all shadow-md">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
        <Icon className="text-white w-6 h-6" />
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
};

const ProfileStats = ({ user }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      <StatCard icon={Code} value={user.solveProblems.length} label="Problems Solved" color="bg-blue-600" />
      <StatCard icon={BarChart3} value="80%" label="Acceptance Rate" color="bg-green-600" />
      <StatCard icon={Clock} value="156h" label="Coding Time" color="bg-purple-600" />
      <StatCard icon={Users} value="92" label="Collaboration Score" color="bg-cyan-600" />
    </div>
  );
};

export default ProfileStats;
