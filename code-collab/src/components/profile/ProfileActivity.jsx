const ProfileActivity = ({ activityData }) => {
  return (
    <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700 mt-8 shadow-md">
      <h2 className="text-xl font-semibold mb-4">30-Day Activity</h2>

      <div className="grid grid-cols-7 gap-4">
        {activityData.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="grid grid-cols-1 gap-1">
              {day.problems.map((level, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-sm ${
                    level === 1 ? "bg-green-400" :
                    level === 2 ? "bg-green-500" :
                    "bg-green-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileActivity;
