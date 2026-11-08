import { Link } from "react-router-dom";
import hero from "../assets/images/hero2.jpg";

function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      {/* Left Gradient Overlay - softer for better readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, 
            oklch(0% / 0.80) 1%, 
            oklch(0% / 0.35) 40%, 
            oklch(0% / 0.05) 70%, 
            oklch(0% / 0) 100%)`,
        }}
      ></div>

      {/* Bottom Gradient Overlay - subtle */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, 
            transparent 40%, 
            oklch(0% / 0.30) 100%)`,
        }}
      ></div>

      {/* Decorative floating elements */}
      <div className="absolute top-20 right-10 z-0 opacity-20 animate-float">
        <div className="w-16 h-16 border-4 border-orange-500 rounded-full blur-sm"></div>
      </div>
      <div className="absolute bottom-40 right-20 z-0 opacity-10 animate-float-delayed">
        <div className="w-24 h-24 border-4 border-orange-300 rounded-full blur-sm"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12  2xl:px-40 h-full flex items-center">
          
          {/* Content Wrapper - Added negative margin to push left */}
          <div className="max-w-[560px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[720px] backdrop-blur-[1px] bg-black/5 rounded-8xl p-2 sm:p-4 -ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16 xl:-ml-51 2xl:-ml-52 ">
            
            {/* "Explore" - Clean white with subtle tracking */}
            <h3 className="text-white tracking-[2px] font-primary text-[24px] sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[42px] 2xl:text-[48px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] opacity-100">
              Explore
            </h3>

            {/* "Bangladessh" - Strong white with refined shadow */}
            <h1 className="text-white leading-[0.8] font-primary text-[56px] sm:text-[72px] md:text-[85px] lg:text-[100px] xl:text-[120px] 2xl:text-[140px] drop-shadow-[0_4px_25px_rgba(0,0,0,0.4)] tracking-tight">
              Bangladesh
            </h1>

            {/* Enhanced Tagline with Beautiful Gradient - Adjusted for Golden Hour vibe */}
            <p className="mt-1 sm:mt-2 font-secondary text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] xl:text-[34px] 2xl:text-[36px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)] font-medium tracking-wide"
               style={{
                 background: "linear-gradient(135deg, #F9E79F 0%, #F7DC6F 25%, #EA8E01 70%, #D35400 100%)",
                 WebkitBackgroundClip: "text",
                 WebkitTextFillColor: "transparent",
                 backgroundClip: "text",
                 backgroundSize: "200% 200%",
                 animation: "gradientShift 4s ease-in-out infinite",
               }}
            >
              Plan Your Dream Trip Within Your Budget
            </p>

            {/* Paragraph - Crisp white with subtle opacity */}
            <p className="text-white/95 mt-2 sm:mt-3 leading-relaxed sm:leading-8 md:leading-9 font-body text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[22px] max-w-[480px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              Discover destinations, manage expenses, and explore nearby 
              attractions across Bangladesh with our smart travel planner.
            </p>

            {/* Main CTA Button - Transparent Glossy with Warm Hover */}
            <div className="mt-5 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-10">
              <Link to="/destination">
              <button className="group relative text-white font-semibold rounded-full px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-4.5 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] tracking-wide flex items-center gap-3 justify-center overflow-hidden backdrop-blur-md bg-white/10 hover:bg-white/20 border-2 border-white/40 hover:border-[#ffb726] transition-all duration-300 shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(255,160,17,0.4)] hover:scale-105">
                {/* Animated shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                
                {/* Gradient glow on hover */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#FFA011]/20 via-[#EAAF2F]/20 to-[#FFA126]/20 rounded-full blur-xl"></span>
                
                <span className="relative z-10">PLAN YOUR TRIP</span>
                
                {/* Circle Background Arrow Icon - Off-white with glass effect */}
                <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-white/30 border border-white/20 group-hover:scale-110">
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110" 
                    style={{ color: '#F5F5F0' }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2.5" 
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </button>
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll indicator - subtle white */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center bg-black/10 backdrop-blur-sm">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default Hero;