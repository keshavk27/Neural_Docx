import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {clearAuthError,} from "../../features/auth/authSlice.js";
import {verifyOTPThunk,resendOTPThunk,} from "../../features/auth/authThunk.js";

const VerifyOTP = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const location = useLocation();

    const email = location.state?.email || "";
    const {register,handleSubmit,formState: {errors,},} = useForm();
    const {isLoading,error,} = useSelector((state) => state.auth);

    // Redirect if email is missing
    useEffect(() => {
        if (!email) 
        {
            navigate("/register", { replace: true });
        }
    }, [email, navigate]);

    // Verify OTP
    const onSubmit = async (data) => {
        const result = await dispatch(verifyOTPThunk({email,otp: data.otp,}));
        if (verifyOTPThunk.fulfilled.match(result)) 
        {
            toast.success("Account verified successfully.");
            navigate("/login",{ replace: true, });
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
        <>
            <h1 className="mb-2 text-center text-3xl font-bold">
                Verify OTP
            </h1>
            <p className="mb-6 text-center text-sm text-gray-500">
                Enter the OTP sent to
                <span className="font-semibold">
                    {" "}
                    {email}
                </span>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* OTP */}
                <div>
                    <label className="mb-2 block font-medium">
                        OTP
                    </label>
                    <input type="text"  placeholder="Enter OTP" className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        {...register(
                            "otp",
                            {
                                required: "OTP is required.",
                            }
                        )}
                    />
                    {
                        errors.otp && (<p className="mt-1 text-sm text-red-500"> {errors.otp.message} </p>)
                    }
                </div>

                {/* Verify Button */}
                <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70" >
                    {
                        isLoading ? "Verifying..." : "Verify OTP"
                    }
                </button>
            </form>

            {/* Resend OTP */}
            <button type="button" onClick={handleResendOTP} disabled={isLoading} className="mt-4 w-full rounded-lg border border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70">
                Resend OTP
            </button>
            <p className="mt-6 text-center text-sm">
                Already verified?
                <Link to="/login" className="ml-2 font-semibold text-blue-600 hover:underline">
                    Login
                </Link>
            </p>
        </>
    );
};
export default VerifyOTP;