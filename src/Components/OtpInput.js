import React, { useState, useRef } from "react";

export default function OtpInput({ length = 6, onOtpSubmit }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  // Handle Input Change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!isNaN(value)) {
      const newOtp = [...otp];

      // ✅ Allow delete and replace previous value
      newOtp[index] = value.length > 0 ? value[value.length - 1] : "";

      setOtp(newOtp);

      // Move focus to next input field if user types
      if (value.length > 0 && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      const newOtp = [...otp];

      // ✅ Remove current value and focus on previous input
      newOtp[index] = "";
      setOtp(newOtp);

      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-2 mb-4">
        {otp.map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-500 rounded focus:border-[orange] outline-none text-[orange]"
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {/* ✅ Verify OTP Button */}
      <button
        onClick={() => onOtpSubmit(otp.join(""))}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
      >
        Verify OTP
      </button>
    </div>
  );
}
