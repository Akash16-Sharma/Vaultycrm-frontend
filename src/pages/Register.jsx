import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function ( ){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirm,setConfirm]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(false);

    const navigate=useNavigate();

    const handleRegister=async(e)=>{
        e.preventDefault();
        setError("");

        //Adding Frontend Validation
        if(!name||!email||!password||!confirm)
        {
            return setError("All Fields are required");
        }

        if(password.length<8){
            return setError("Password Must Be Atleast 8 Characters");
        }
        if(password!=confirm){
            return setError("Password Doesn't Match");
        }

        try{
            setLoading(true)
            await axios.post("http://localhost:5000/api/auth/register",{
                name,
                email,
                password
            });

            //Redirect to Login
            navigate("/")
        }catch (err) {
        setError(err.response?.data?.message || "Registration failed.");
         } 
        finally {
        setLoading(false);
    }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-800">Create Account</h1>
                    <p className="text-gray-500 text-sm mt-1">Join VaultlyCRM now</p>
               </div>

               <form onSubmit={handleRegister} className="space-y-5">
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-2 rounded border border-red-200">
                     {error}
                    </div>
                )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Aakash Sharma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                             required
                        />
                </div>

                <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md font-medium transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
               </form>

               <div className="mt-6 text-center text-xs text-gray-400">
                 Already have an account?{" "}
                 <a href="/" className="text-blue-500 hover:underline">
                 Sign in
                </a>
               </div>
            </div>
        </div>
    );
}

