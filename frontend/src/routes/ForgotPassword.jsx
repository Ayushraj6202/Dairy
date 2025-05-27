import React, { useState } from 'react';
import { Link } from 'react-router-dom'
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error1, setError1] = useState('');
    const [success, setSuccess] = useState('');
    const [step, setStep] = useState(1); // 1 for email, 2 for OTP
    const [loading, setLoading] = useState(false); // Loading state
    const [isPasswordReset, setIsPasswordReset] = useState(0); // New state variable
    const URL_BASIC = import.meta.env.VITE_URL_BASIC;

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const url = `${URL_BASIC}/password/reset`;
        setLoading(true); // Start loading

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (response.ok) {
                setError1('');
                setSuccess('OTP sent successfully! Check your email.');
                setStep(2);
            } else {
                setError1(result.msg);
                setSuccess('');
            }
        } catch (error) {
            console.log("OTP Not Sent");
            setError1('OTP Not sent');
            setSuccess('');
        } finally {
            // setError1('OTP Not sent');
            setLoading(false); // End loading
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const url = `${URL_BASIC}/password/verify`;
        setLoading(true); // Start loading

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ email, otp, newPassword }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                setSuccess(result.msg);
                setError1('');
                setIsPasswordReset(true); // Set the password reset flag
            } else {
                setError1(result.msg);
                setSuccess('');
            }
        } catch (error) {
            setError1('Invalid OTP');
            setSuccess('');
        } finally {
            // setError1('Invalid OTP');
            setLoading(false); // End loading
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
                <div>
                    {error1 && <p className="text-red-500">{error1}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                </div>
                {!isPasswordReset ? ( // Conditional rendering based on isPasswordReset
                    step === 1 ? (
                        <form onSubmit={handleEmailSubmit}>
                            <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />
                            <button
                                type="submit"
                                className={`w-full py-2 rounded transition duration-300 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                disabled={loading} // Disable button during loading
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit}>
                            <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />
                            <button
                                type="submit"
                                className={`w-full py-2 rounded transition duration-300 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                disabled={loading} // Disable button during loading
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    )
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl text-green-400 font-semibold mb-4">Password Reset Successful!</h2>
                        <p className="text-gray-600">You can now {" "}
                            <Link
                                to="/login"
                                className='text-blue-400'
                            >
                                Login
                            </Link>
                            {" "}
                            with your new password.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
