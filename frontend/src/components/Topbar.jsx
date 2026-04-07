import { useAuth } from '../context/AuthContext';

export default function Topbar() {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between w-full">

      <div className="flex items-center bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl w-1/2">
        <span className="mr-2">🔍</span>
        <input
          placeholder="Search..."
          className="bg-transparent outline-none text-white w-full placeholder-zinc-500"
        />
      </div>

      <div className="text-white bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-2">
        👤 <span className="font-medium">{user?.name?.split(' ')[0] || 'User'}</span>
      </div>
    </div>
  );
}