import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#090b10] text-white flex flex-col font-sans">
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-10 py-6">
        <div className="text-2xl font-bold text-[#34d399]">
          Expensio
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button className="text-[#34d399] border-b-2 border-[#34d399] pb-1">Features</button>
          <button className="text-gray-400 hover:text-gray-200 transition">About</button>
          <button className="text-gray-400 hover:text-gray-200 transition">Contact</button>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
          <Link to="/signup" className="bg-[#34d399] hover:bg-[#2ebc87] text-[#090b10] px-6 py-2 rounded-full transition font-bold">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-10 max-w-7xl mx-auto w-full gap-16 py-12">
        
        {/* Left Column content */}
        <div className="flex-1 space-y-8">
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-xs font-bold tracking-widest text-[#34d399] uppercase">The Financial Luminary</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Illuminate Your <br />
            <span className="text-[#34d399]">Finances</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Elevate your wealth management with precision tracking and editorial-grade analytics. Designed for those who demand clarity in every transaction.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link to="/signup" className="bg-[#34d399] hover:bg-[#2ebc87] text-[#090b10] px-8 py-3 rounded-xl transition font-bold flex items-center gap-2">
              Sign Up Free <span className="ml-1">→</span>
            </Link>
            <button className="bg-white/5 hover:bg-white/10 text-[#34d399] font-medium px-8 py-3 rounded-xl transition">
              View Demo
            </button>
          </div>
          
        </div>

        {/* Right Column mockup */}
        <div className="flex-1 w-full relative">
           <div className="bg-[#121620] border border-white/5 rounded-2xl p-6 shadow-2xl relative w-full h-[450px] overflow-hidden flex flex-col">
              
              <div className="flex justify-between items-center mb-8">
                 <div className="text-sm font-bold text-white opacity-80">Expensio</div>
                 <div className="flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-white/20"></div>
                   <div className="w-2 h-2 rounded-full bg-white/20"></div>
                   <div className="w-2 h-2 rounded-full bg-white/20"></div>
                 </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#34d399]/20 flex items-center justify-center text-[#34d399] text-xs font-bold">₹</div>
                <div>
                   <div className="text-xs text-gray-500 mb-1">Total Balance</div>
                   <div className="text-2xl font-bold text-white">₹8,920.00</div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 flex-1 flex gap-4">
                 <div className="flex-1 space-y-4">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-[#34d399] w-[70%]"></div>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-[#34d399] w-[40%]"></div>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-[#34d399] w-[90%]"></div>
                    </div>
                 </div>
                 <div className="w-[100px] bg-white/5 rounded-lg"></div>
              </div>

              {/* Decorative blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#34d399]/10 blur-[100px] rounded-full pointer-events-none"></div>

           </div>
        </div>

      </main>
    </div>
  );
}