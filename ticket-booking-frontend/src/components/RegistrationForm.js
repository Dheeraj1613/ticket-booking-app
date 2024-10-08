import React, { useState } from "react";
import Select from "react-select";
import "./RegistrationForm.css";
import { useNavigate } from "react-router-dom";
import formImage from "../register.png"; 
import indianCities from "indian-cities-json";



const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    password: "",
    mobile: "",
    city: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle city selection from React Select
  const handleCityChange = (selectedOption) => {
    setFormData({
      ...formData,
      city: selectedOption ? selectedOption.value : "", // Set city value from dropdown
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify the OTP before registering.");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthday ||
      !formData.gender ||
      !formData.email ||
      !formData.password ||
      !formData.mobile ||
      !formData.city
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5005/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful! You can login now");
        navigate("/"); // Redirect to login page after registration
      } else {
        const errorText = await response.text();
        alert(`${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendOtp = async () => {
    if (otpAttempts >= 5) {
      alert("Maximum OTP attempts reached.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5005/users/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setOtpSent(true);
        setShowOtpField(true);
        setOtpAttempts(otpAttempts + 1);
        alert("OTP sent to your email!");
      } else {
        alert("Error sending OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:5005/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: otpInput }),
      });

      if (response.ok) {
        setOtpVerified(true);
        setErrorMessage("");
        alert("OTP verified successfully!");
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error verifying OTP.");
      console.error("Error:", error);
    }
  };

  const cityOptions = indianCities.cities.map((city) => ({
    value: city.name,
    label: `${city.name}, ${city.state}`, // Display city name and state
  }));

  console.log(indianCities); 

  return (
    <div className="registration-page">
      <div className="registration-box">
        <div className="form-section">
          <h2 className="registration-heading">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>


            {/* City Dropdown with a container */}
            <div className="city-select-container">
              <Select
                options={cityOptions}
                placeholder="Select City"
                value={cityOptions.find((city) => city.value === formData.city)}
                onChange={handleCityChange}
                isClearable
                required
              />
            </div>

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="verify-button"
              onClick={sendOtp}
              disabled={otpVerified || otpAttempts >= 5}
            >
              {otpVerified ? "Verified ✔️" : "Verify"}
            </button>

            {showOtpField && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="verify-button"
                  onClick={verifyOtp}
                  disabled={otpVerified}
                >
                  Verify OTP
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
              </>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={!otpVerified}
            >
              Register
            </button>
          </form>
        </div>
        <div className="image-section">
          <img src={formImage} alt="Form Visual" className="form-image" />
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;