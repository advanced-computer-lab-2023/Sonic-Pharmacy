import React, { useState } from "react";
import { Modal, Button, Form, Tab, Tabs } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updatePatientAddresses } from "../../state/loginPatientReducer";
import { Link } from 'react-router-dom';
import CheckOutDoneModal from "./PatientCheckOutDoneModal";

function PatientCheckOutModal({ subtotal, total, delivery }) {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const addresses = useSelector((state) => state.patientLogin.addresses);
  const dispatch = useDispatch();

  const handleClose = () => {
    setSelectedMedicine(null);
    setPaymentMethod("wallet");
    setDeliveryAddress("");
    setUseExistingAddress(false);
    setBookingStatus("");
    
  };

  const handleBookMedicine = () => {
    // Perform booking logic here
    // You can use the selectedMedicine, bookingName, paymentMethod, creditCard, and deliveryAddress states to submit the booking request
    // Update the bookingStatus state accordingly
  };

  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handleAddNewAddress = () => {
    dispatch(updatePatientAddresses(deliveryAddress));
  };

  const totalTextStyle = {
    fontWeight: "bold",
    fontSize: "1.5em", // Adjust the font size as needed
  };

  return (
    <Modal show={true} onHide={handleClose}>
    {/* <Modal onHide={handleClose}> */}
      <Modal.Header closeButton>
        <Modal.Title>Order Medicine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookingStatus === "success" ? (
          <p>You have successfully ordered the medicine.</p>
        ) : (
          <Tabs
            defaultActiveKey="paymentSummary"
            id="orderTabs"
            className="mb-3"
          >
            <Tab eventKey="paymentSummary" title="Payment Summary">
              {/* Payment Summary Section */}
              <div>
                <p>Subtotal: {subtotal}</p>
                <p>Delivery Fees: {delivery}</p>
                <p style={totalTextStyle}>Total: {total}</p>
              </div>
            </Tab>
            <Tab eventKey="paymentMethod" title="Payment Method">
              <Form>
                <Form.Group controlId="paymentMethod">
                  <Form.Label style={totalTextStyle}>Payment Method</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Wallet"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === "wallet"}
                    // onChange={handlePaymentMethodChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Credit Card"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    // onChange={handlePaymentMethodChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Cash on Delivery"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentMethod === "cashOnDelivery"}
                    // onChange={handlePaymentMethodChange}
                  />
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey="address" title="Address">
              <Form>
                <Form.Group controlId="addressOptions">
                  <Form.Label style={totalTextStyle}>Address </Form.Label>
                  <Form.Check
                    type="radio"
                    label="Add New Address"
                    name="addressOptions"
                    value="newAddress"
                    checked={!useExistingAddress}
                    onChange={() => setUseExistingAddress(false)}
                  />
                  <Form.Check
                    type="radio"
                    label="Choose Existing Address"
                    name="addressOptions"
                    value="existingAddress"
                    checked={useExistingAddress}
                    onChange={() => setUseExistingAddress(true)}
                  />
                </Form.Group>
                {useExistingAddress ? (
                  <div>
                    {/* Render existing addresses here */}
                    <p>Existing Addresses:</p>
                    <div className="existing-addresses">
                      {addresses ? (
                        addresses.map((address, index) => (
                          <div
                            key={index}
                            className={`existing-address ${
                              deliveryAddress === address
                                ? "selected-address"
                                : ""
                            }`}
                            onClick={() => setDeliveryAddress(address)}
                            style={{
                              color:
                                deliveryAddress === address ? "blue" : "black",
                            }}
                          >
                            {address}
                          </div>
                        ))
                      ) : (
                        <div>No existing addresses</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Render form for new address */}
                    <Form.Group controlId="deliveryAddress">
                      <Form.Label>New Delivery Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter new delivery address"
                        value={deliveryAddress}
                        onChange={handleDeliveryAddressChange}
                      />
                    </Form.Group>
                    {/* Add teal button for adding new address */}
                    <Button
                      variant="info"
                      onClick={handleAddNewAddress}
                      className="mb-3"
                      style={{
                        backgroundColor: "#05afb9",
                        borderColor: "#05afb9",
                        color: "#ffffff",
                      }}
                    >
                      Add Address
                    </Button>
                  </div>
                )}
              </Form>
            </Tab>
          </Tabs>
        )}
      </Modal.Body>
      <Modal.Footer>
  {bookingStatus === "success" ? (
    <Button variant="success" onClick={handleClose}>
      Close
    </Button>
  ) : (
    <div>
      <Link to="/patient/patient-checkoutcomplete">
        <Button variant="success" style={{ marginRight: "10px" }}>
          Order
        </Button>
      </Link>
      <Link to="/patient/patient-cart">
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
      </Link>
    </div>
  )}
</Modal.Footer>
    </Modal>
  );
}

export default PatientCheckOutModal;
