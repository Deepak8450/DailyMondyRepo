import React, { useState } from "react";
import OtpInput from "./OtpInput";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

export default function OtpPage() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
 const navigate = useNavigate();
  // Function to Generate OTP
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  };

  // Function to Send OTP via Email
  const sendOtp = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);

    const templateParams = {
      to_email: email,
      otp: newOtp
    };

    emailjs.send("service_obqobkl", "template_zdizszy", templateParams, "a7YAGCXDVfEoeC2HU")
      .then((response) => {
        console.log("OTP Sent Successfully!", response.status, response.text);
        alert(`OTP Sent Successfully, Please check your inbox.`);
        setOtpSent(true);
      })
      .catch((error) => {
        console.error("Failed to send OTP:", error);
        alert("Failed to send OTP. Try again.");
      });
  };

  // Function to Verify OTP
  const verifyOtp = (enteredOtp) => {
    if (enteredOtp === generatedOtp) {
      alert("✅ OTP Verified! Registration Completed.");

      setTimeout(() => {
        navigate("/home"); // Redirect to the home page
      }, 1000);
    } else {
      alert("❌ Invalid OTP. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4 text-[orange]">{otpSent ? "Enter OTP" :"Email OTP Verification"}</h1>

      {!otpSent ? (
        <>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="p-2 text-black border-2 border-gray-400 rounded-md mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md">
            Send OTP via Email
          </button>
        </>
      ) : (
        <>
          <OtpInput length={6} onOtpSubmit={verifyOtp} />
        </>
      )}
    </div>
  );
}
