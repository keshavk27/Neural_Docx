import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {clearAuthError} from "../../features/auth/authSlice.js";
import {registerThunk} from "../../features/auth/authThunk.js";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register,handleSubmit,formState: {errors,},} = useForm();
    const {isLoading,error,} = useSelector((state) => state.auth);

    // Register Submit
    const onSubmit = async (data) => {
        const result = await dispatch(registerThunk(data));
        if (registerThunk.fulfilled.match(result)) 
        {
            toast.success("OTP sent successfully.");
            navigate("/verify-otp",{state: {email: data.email}});
        }
    };

    // Show Backend Errors
    useEffect(() => {
        if (error) 
        {
            toast.error(error);
            dispatch(clearAuthError());
        }
    }, [error, dispatch]);

    return (
        <>
            <h1 className="mb-6 text-center text-3xl font-bold">
                Register
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name */}
                <div>
                    <label className="mb-2 block font-medium">
                        Full Name
                    </label>
                    <input type="text" placeholder="Enter your full name" className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        {...register(
                            "fullname",
                            {
                                required: "Full name is required.",
                            }
                        )}
                    />
                    {
                        errors.fullname && ( <p className="mt-1 text-sm text-red-500"> {errors.fullname.message}</p>)
                    }
                </div>

                {/* Username */}
                <div>
                    <label className="mb-2 block font-medium">
                        Username
                    </label>
                    <input type="text" placeholder="Enter your username" className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        {...register(
                            "username",
                            {
                                required: "Username is required.",
                            }
                        )}
                    />
                    {
                        errors.username && (<p className="mt-1 text-sm text-red-500">  {errors.username.message}  </p>)
                    }
                </div>

                {/* Email */}
                <div>
                    <label className="mb-2 block font-medium">
                        Email
                    </label>
                    <input type="email" placeholder="Enter your email" className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        {...register(
                            "email",
                            {
                                required: "Email is required.",
                            }
                        )}
                    />
                    {
                        errors.email && (<p className="mt-1 text-sm text-red-500">  {errors.email.message}  </p>)
                    }
                </div>

                {/* Password */}
                <div>
                    <label className="mb-2 block font-medium">
                        Password
                    </label>
                    <input type="password" placeholder="Enter your password" className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                        {...register(
                            "password",
                            {
                                required: "Password is required.",
                            }
                        )}
                    />
                    {
                        errors.password && ( <p className="mt-1 text-sm text-red-500"> {errors.password.message} </p>)
                    }

                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
                    {
                        isLoading ? "Creating Account...": "Register"
                    }
                </button>
            </form>
            <p className="mt-6 text-center text-sm">
                Already have an account?
                <Link to="/login" className="ml-2 font-semibold text-blue-600 hover:underline" >
                    Login
                </Link>
            </p>
        </>
    );
};
export default Register;