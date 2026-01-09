const RecentProblemsTable = ({ data, navigate }) => {
  return (
    <div className="bg-[#1F2937] p-6 rounded-xl border border-gray-700 mt-8 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Solved Problems</h2>

        <button
          onClick={() => navigate("/problems")}
          className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Solve Problems
        </button>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-400">No problems solved yet.</p>
      ) : (
        <table className="w-full text-left">
          {/* headers */}
        </table>
      )}
    </div>
  );
};

export default RecentProblemsTable;
