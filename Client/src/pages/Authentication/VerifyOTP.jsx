import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ShieldCheck, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { clearAuthError } from "../../features/auth/authSlice.js";
import { verifyOTPThunk, resendOTPThunk } from "../../features/auth/authThunk.js";

const VerifyOTP = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isLoading, error } = useSelector((state) => state.auth);

  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  // Verify OTP
  const onSubmit = async (data) => {
    const result = await dispatch(verifyOTPThunk({ email, otp: data.otp }));
    if (verifyOTPThunk.fulfilled.match(result)) 
    {
      toast.success("Account verified successfully.");
      navigate("/login", { replace: true });
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    const result = await dispatch(resendOTPThunk(email));
    if (resendOTPThunk.fulfilled.match(result)) 
    {
      toast.success("OTP sent successfully.");
    }
  };

  // Backend errors
  useEffect(() => {
    if (error) 
    {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  return (
    <div className="fixed inset-0 flex overflow-y-auto bg-[#0B0E14] text-[#E9ECF3]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @keyframes dv-beam-move { 0% { transform: translateY(-10px);} 100% { transform: translateY(150px);} }
        @keyframes dv-node-pulse { 0%,100% { opacity:.45; transform: translateY(0);} 50% { opacity:1; transform: translateY(-3px);} } .dv-beam { animation: dv-beam-move 4.5s linear infinite; }.dv-node { animation: dv-node-pulse 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {.dv-beam, .dv-node { animation: none !important; }}
      `}</style>

      <div className="relative hidden md:flex flex-1 flex-col justify-between overflow-hidden p-12 bg-[#0D1119]" style={{ backgroundImage: "radial-gradient(circle at 28% 22%, rgba(79,217,197,0.14), transparent 60%), radial-gradient(circle at 82% 78%, rgba(232,165,82,0.08), transparent 55%)",}}>
        <div>
          <div className="text-4xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Neural Docx
          </div>
          <p className="mt-2 text-[#97A1B8]">Secure your document workspace.</p>
        </div>

        <div className="flex flex-1 items-center justify-center min-h-50">
          <svg viewBox="0 0 240 200" className="w-full max-w-70" aria-hidden="true">
            <defs>
              <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4FD9C5" stopOpacity="0" />
                <stop offset="50%" stopColor="#4FD9C5" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#4FD9C5" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g stroke="#333B52" strokeWidth="1" opacity="0.4">
              <line x1="75" y1="45" x2="30" y2="40" />
              <line x1="75" y1="70" x2="20" y2="90" />
              <line x1="80" y1="110" x2="35" y2="150" />
              <line x1="95" y1="140" x2="50" y2="175" />
              <line x1="165" y1="50" x2="210" y2="45" />
              <line x1="165" y1="75" x2="220" y2="95" />
              <line x1="160" y1="115" x2="200" y2="150" />
              <line x1="150" y1="30" x2="185" y2="20" />
            </g>

            <rect x="75" y="15" width="90" height="130" rx="6" fill="#1A1F2C" stroke="#333B52" />
            <rect x="88" y="32" width="55" height="4" rx="2" fill="#333B52" />
            <rect x="88" y="45" width="40" height="4" rx="2" fill="#333B52" />
            <rect x="88" y="58" width="60" height="4" rx="2" fill="#333B52" />
            <rect x="88" y="71" width="34" height="4" rx="2" fill="#333B52" />
            <rect x="88" y="88" width="55" height="4" rx="2" fill="#333B52" />
            <rect x="88" y="101" width="45" height="4" rx="2" fill="#333B52" />
            <rect x="88" y="114" width="60" height="4" rx="2" fill="#333B52" />
            <rect x="88" y="127" width="30" height="4" rx="2" fill="#333B52" />

            <g className="dv-beam">
              <rect x="75" y="0" width="90" height="24" fill="url(#beamGrad)" />
            </g>

            <circle cx="30" cy="40" r="3.2" fill="#4FD9C5" className="dv-node" style={{ animationDelay: "0s" }} />
            <circle cx="20" cy="90" r="3.2" fill="#4FD9C5" className="dv-node" style={{ animationDelay: "0.3s" }} />
            <circle cx="35" cy="150" r="3.2" fill="#4FD9C5" className="dv-node" style={{ animationDelay: "0.6s" }} />
            <circle cx="50" cy="175" r="3.2" fill="#4FD9C5" className="dv-node" style={{ animationDelay: "0.9s" }} />
            <circle cx="210" cy="45" r="3.2" fill="#4FD9C5" className="dv-node" style={{ animationDelay: "0.15s" }} />
            <circle cx="220" cy="95" r="3.2" fill="#4FD9C5" className="dv-node" style={{ animationDelay: "0.45s" }} />
            <circle cx="200" cy="150" r="3.2" fill="#4FD9C5" className="dv-node" style={{ animationDelay: "0.75s" }} />
            <circle cx="185" cy="20" r="3.2" fill="#4FD9C5" className="dv-node" style={{ animationDelay: "1.05s" }} />
          </svg>
        </div>

        <div className="flex items-baseline gap-2 text-[13px] text-[#97A1B8]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <span className="text-[#4FD9C5]">$</span>
          <span>awaiting_verification_token...</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-100 rounded-2xl border border-[#242B3D] bg-[#131722] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <h1 className="mb-1 text-2xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Verify OTP
          </h1>
          <p className="mb-7 text-sm text-[#97A1B8]">
            Enter the OTP sent to <span className="font-semibold text-[#E9ECF3]">{email}</span>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block font-medium text-sm text-[#97A1B8]">OTP</label>
              <div className="flex h-11 items-center gap-2 rounded-lg border border-[#242B3D] bg-[#1A1F2C] px-3 focus-within:border-[#4FD9C5]">
                <ShieldCheck size={16} className="shrink-0 text-[#97A1B8]" />
                <input type="text" placeholder="Enter OTP" className="w-full min-w-0 bg-transparent text-sm text-[#E9ECF3] outline-none placeholder-[#565F75]" {...register("otp", { required: "OTP is required.",})}/>
              </div>

              {errors.otp && <p className="mt-1 text-sm text-[#E8697A]">{errors.otp.message}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4FD9C5] py-3 font-semibold text-[#06120F] transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-70">
              {
                isLoading ? 
                (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Verifying...
                  </>
                ) : 
                (
                  <>
                    Verify OTP <ArrowRight size={16} />
                  </>
                )
              }
            </button>
          </form>

          <button type="button" onClick={handleResendOTP} disabled={isLoading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#4FD9C5] py-3 font-semibold text-[#4FD9C5] transition hover:bg-[#4FD9C5]/10 disabled:cursor-not-allowed disabled:opacity-70"> {isLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            Resend OTP
          </button>

          <p className="mt-6 text-center text-sm text-[#97A1B8]">
            Already verified?
            <Link to="/login" className="ml-2 font-semibold text-[#4FD9C5] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;