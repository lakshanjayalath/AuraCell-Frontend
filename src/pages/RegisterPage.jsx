import axios from "axios";
import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function register() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users",
                {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                }

            );

            toast.success("Registration successful! Please login.");
            navigate("/login");
            
        } catch (e) {
            console.log("Registration failed", e);
            toast.error("Registration failed. Please check your credentials.");
        }

    }

    return (
        <div className="w-full h-screen bg-[url('/login-bg.jpg')] bg-cover bg-center flex">

            {/* Right side login form */}
            <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center px-4">
                <div className="w-full max-w-[480px] p-6 sm:p-8 md:p-10 bg-primary/10 backdrop-blur-xl shadow-2xl rounded-2xl flex flex-col items-center gap-5 border border-white/20">

                    <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        Welcome To ShopEase
                    </h2>

                    <p className="text-xs sm:text-sm text-primary/80 text-center">
                        Register to continue shopping smart with ShopEase
                    </p>

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 sm:h-12 px-4 rounded-lg bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
                    />
                    {/* First Name */}
                    <input
                        type="text"
                        placeholder="e.g. John"
                        autoComplete="given-name"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full h-11 sm:h-12 px-4 rounded-lg bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
                    />

                    {/* Last Name */}
                    <input
                        type="text"
                        placeholder="e.g. Doe"
                        autoComplete="family_name"
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full h-11 sm:h-12 px-4 rounded-lg bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-11 sm:h-12 px-4 rounded-lg bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
                    />

                    {/* Confirm Password */}
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        autoComplete="current-password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-11 sm:h-12 px-4 rounded-lg bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
                    />

                    {/* Register Button */}
                    <button
                        onClick={register}
                        className="w-full h-11 sm:h-12 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-lg"
                    >
                        Register
                    </button>

                    {/* Links */}
                    <div className="flex justify-between w-full text-xs sm:text-sm text-primary/80 mt-1">
                        <Link to="/login" className="hover:text-accent underline-offset-4">
                            Already have an account? Login
                        </Link>
                    </div>

                </div>
            </div>

            {/* Left side overlay for gradient */}
            <div className="hidden w-1/2 h-full bg-gradient-to-l from-secondary/70 to-transparent lg:flex items-center justify-center">
                <h1 className="text-5xl font-bold text-primary drop-shadow-lg">
                    ShopEase
                </h1>
            </div>


        </div>
    );
}
