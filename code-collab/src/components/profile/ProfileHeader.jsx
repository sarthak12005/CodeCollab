const ProfileHeader = ({ userInfo, profileImage, handleImageClick, removeImage }) => {
  return (
    <div className="flex items-center space-x-6 bg-[#111827] p-6 rounded-xl shadow-lg border border-[#1F2937]">
      <div className="relative group">
        <img
          src={profileImage}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg cursor-pointer group-hover:opacity-75 transition"
          onClick={handleImageClick}
        />

        <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <span className="text-white text-xs">Change</span>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{userInfo.name}</h1>
        <p className="text-indigo-400">@{userInfo.username}</p>
        <p className="text-gray-400 text-sm">Member since Jan 2023</p>

        <div className="flex gap-4 mt-3">
          <span className="flex items-center gap-1 text-yellow-400">
            ⭐ Pro Member
          </span>
          <span className="flex items-center gap-1 text-orange-400">
            🔥 7-day Streak
          </span>
        </div>

        {profileImage && (
          <button
            onClick={removeImage}
            className="text-xs text-red-400 hover:underline mt-2"
          >
            Remove Image
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
