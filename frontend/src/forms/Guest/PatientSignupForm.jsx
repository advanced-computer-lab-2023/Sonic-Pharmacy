import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import FormPassword from "../FormPassword";
import FormInput from "../FormInput";

const PatientSignupForm = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");
  const [error1, setError] = useState(null);
  const [loading, isLoading] = useState(null);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    isLoading(true);
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !birthdate ||
      !gender ||
      !username ||
      !emergencyName ||
      !emergencyPhone ||
      !emergencyRelation
    ) {
      setError("Please fill in all fields");
      console.log(error1);
      isLoading(false);
      return;
    }
    if (!username.trim()) {
      setError("Username is required.");
      isLoading(false);
      return;
    }
    //Validation For Email input field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const englishOnlyRegex = /^[\x00-\x7F]*$/;

    if (!email) {
      setError("Email field cannot be empty.");
      isLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      isLoading(false);
      return;
    }
    if (!englishOnlyRegex.test(email)) {
      setError("Email must be in English only.");
      isLoading(false);
      return;
    }
    if (email.length > 320) {
      setError("Email exceeds maximum character limit (320).");
      isLoading(false);
      return;
    }

    if (/[^\x00-\x7F]/.test(email)) {
      setError("Email cannot contain emojis or special characters.");
      isLoading(false);
      return;
    }
    if (/\s/.test(email)) {
      setError("Email cannot contain spaces.");
      isLoading(false);
      return;
    }
    const emojiRegex = /[\u{1F300}-\u{1F6FF}]/u;
    const numberRegex = /\d/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const languageRegex = /[^\x00-\x7F]/;
    const nameRegex = /^[^\s]+(\s[^\s]+)?$/;

    if (name.length < 2) {
      setError("name must be at least 2 characters.");
      isLoading(false);
      return;
    }
    if (emojiRegex.test(name)) {
      setError(" name cannot contain emojis.");
      isLoading(false);
      return;
    }
    if (numberRegex.test(name)) {
      setError("name cannot contain numbers.");
      isLoading(false);
      return;
    }
    if (symbolRegex.test(name)) {
      setError(" name cannot contain symbols.");
      isLoading(false);
      return;
    }
    if (languageRegex.test(name)) {
      setError("Last name cannot contain characters from multiple languages.");
      isLoading(false);
      return;
    }
    if (!nameRegex.test(name)) {
      setError(
        "Name must contain either one name or two names with only one space between them."
      );
      isLoading(false);
      return;
    }

    //Validation for Password Field
    var uppercaseRegex = /[A-Z]/;
    var lowercaseRegex = /[a-z]/;
    var digitRegex = /[0-9]/;
    var specialCharRegex = /[~!@#$%^&*_+=`|(){}[\]:;"'<>,.?/-]/;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      isLoading(false);
      return;
    }

    if (!uppercaseRegex.test(password)) {
      setError("Password must contain at least one uppercase letter");
      isLoading(false);
      return;
    }

    if (!lowercaseRegex.test(password)) {
      setError("Password must contain at least one lowercase letter");
      isLoading(false);
      return;
    }
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

    // Check if the selected birthdate is greater than 20 years ago
    if (new Date(birthdate) > tenYearsAgo) {
      setError("You must be at least 10 years old to sign up.");
      isLoading(false);
      return;
    }

    if (!digitRegex.test(password)) {
      setError("Password must contain at least one digit");
      isLoading(false);
      return;
    }

    if (!specialCharRegex.test(password)) {
      setError("Password must contain at least one special character");
      isLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      isLoading(false);
      return;
    } else {
      try {
        const response = await axios.post("/newPatient", {
          username: username,
          name: name,
          email: email,
          password: password,
          dateOfBirth: birthdate,
          gender: gender,
          mobileNumber: phoneNumber,
          emergencyFullName: emergencyName,
          emergencyMobileNumber: emergencyPhone,
          emergencyRelation: emergencyRelation,
        });

        if (response.status === 201) {
          isLoading(false);
          navigate("/patient");
        } else {
          setError("Signup failed");
          isLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);

        if (error.response && error.response.status === 409) {
          setError("Username taken!");
        } else if (error.response && error.response.status !== 201) {
          setError("Signup failed");
        } else {
          setError(
            "An error occurred while signing up. Please try again later."
          );
        }

        isLoading(false);
      }
    }
  };

  return (
    <div className="col-9 form-container">
      <div className="form-title">Hello!</div>
      <div className="form-title">SignUp to Get Started</div>
      <form className="rounded-3" onSubmit={handleSubmit}>
        <div className="col">
          <div className="form-group">
            <FormInput
              name="Full Name"
              type="text"
              placeholder="Jogn Doe"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <FormInput
              name="Birth date"
              type="date"
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="col">
            <FormInput
              name="Username"
              placeholder="ElinaJohn1"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormInput
              name="Phone Number"
              type="text"
              placeholder="0506404491"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="col" style={{ marginTop: "32px" }}>
            <select
              name="Gender"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              className="form-control"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
        </div>
        <FormInput
          name="Email"
          type="email"
          placeholder="john.doe@ibm.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormPassword
          id="password"
          name="Password"
          type="password"
          placeholder="**************"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormPassword
          name="Confirm Password"
          type="password"
          placeholder="**************"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="row">
          <div className="col">
            <FormInput
              name="Emergency Name"
              type="text"
              placeholder="John Doe"
              onChange={(e) => setEmergencyName(e.target.value)}
            />
          </div>
          <div className="col">
            <FormInput
              name="Emergency Phone"
              type="text"
              placeholder="Emergency Phone"
              onChange={(e) => setEmergencyPhone(e.target.value)}
            />
          </div>
        </div>
        <FormInput
          name="Emergency Relation"
          type="text"
          placeholder="Emergency Relation"
          onChange={(e) => setEmergencyRelation(e.target.value)}
        />

        <button
          id="nextbtn"
          className="w-100 btn-sm custom-button"
          type="submit"
        >
          Next
        </button>
        <div className="form-comment" style={{ cursor: "default" }}>
          Have an account?{" "}
          <div
            className="text-decoration-none link-decoration"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        </div>
        {error1 && (
          <div
            style={{
              marginTop: "2rem",
              backgroundColor: "#f44336", // Red background color
              color: "white", // White text color
              padding: "10px", // Padding around the message
              borderRadius: "5px", // Rounded corners
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Box shadow for a subtle effect
            }}
          >
            {error1}
          </div>
        )}
      </form>
    </div>
  );
};

export default PatientSignupForm;
