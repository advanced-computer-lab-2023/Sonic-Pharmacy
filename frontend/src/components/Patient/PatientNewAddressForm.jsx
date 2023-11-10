import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormInput from "../../forms/FormInput";

const PatientNewAddressForm = ({ textStyle }) => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const [buildingNum, setBuildingNum] = useState("");
  const [floor, setFloor] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission here, for example, sending the data to a server.
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // You can add validation logic here if needed.

    // Perform further actions, e.g., sending data to the server.

    setLoading(false);
    navigate("/patient");
  };

  return (
    <div className="col-9 form-container">
      <div className="form-title">Add Delivery Address</div>
      <Form className="rounded-3" onSubmit={handleSubmit}>
        <FormInput
          name="Country"
          type="text"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <FormInput
          name="City"
          type="text"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <FormInput
          name="Street Name"
          type="text"
          placeholder="Street Name"
          onChange={(e) => setStreetName(e.target.value)}
        />
        <FormInput
          name="Building Number"
          type="text"
          placeholder="Building Number"
          onChange={(e) => setBuildingNum(e.target.value)}
        />
        <FormInput
          name="Floor"
          type="text"
          placeholder="Floor"
          onChange={(e) => setFloor(e.target.value)}
        />
        <FormInput
          name="Postal Code"
          type="text"
          placeholder="Postal Code"
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <button
          className="w-100 btn-sm custom-button"
          disabled={loading}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          Add Delivery Address
        </button>
        {error && (
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
            {error}
          </div>
        )}
      </Form>
    </div>
  );
};

export default PatientNewAddressForm;