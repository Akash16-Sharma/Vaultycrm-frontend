const Topbar = () => {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Hi, Aakash</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Topbar;
