import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Container, Button } from "react-bootstrap";
import medicineBlueImg from  '../../Assets/Patient/medicineBlueImg.jpg';
function CartItems() {
  const [medicine, setMedicine] = useState([
    {
      id: 1,
      quantity: 2,
      image: medicineBlueImg,
      name: "Medicine 1",
      price: 10.99,
    },
    {
      id: 2,
      quantity: 1,
      image: medicineBlueImg,
      name: "Medicine 2",
      price: 7.99,
    },
    {
      id: 3,
      quantity: 5,
      image: medicineBlueImg,
      name: "Medicine 3",
      price: 4.99,
    },
    // Add more medicine items here
  ]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setMedicine((prevMedicine) =>
      prevMedicine.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDeleteItem = (itemId) => {
    setMedicine((prevMedicine) => prevMedicine.filter((item) => item.id !== itemId));
  };

   // Calculate the subtotal
   const subtotal = medicine.reduce((acc, item) => acc + item.price * item.quantity, 0);
   const total = subtotal+50;
   const delivery=50;

  const plusMinusButtonStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "50%", // Makes the buttons circular
    backgroundColor: "#4fa4ff", // Blue color
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "10px",
  };

  const lineStyle = {
    borderBottom: "3px solid #ccc",
    width: "100%",
    margin: "50px 0 0 0",
  };

  const lineStyle2 = {
    borderBottom: "3px solid #ccc",
    width: "100%",
    margin: "5px 0 0 0",
  };
  const cartItemStyle = {
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px", // Add padding on the left
    borderRadius: "10px", // Apply rounded edges to each row
    overflow: "hidden", // Ensure content within the rounded edges is visible
    border: "20px solid white", // Add white borders
    margin: "10px 0", // Add margin to separate the rows
  };

  const buttonsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "10px", // Add margin to separate buttons
  };

  const quantityStyle = {
    fontSize: "20px", // Increase font size
    fontWeight: "bold", // Make it bold
  };

  const trashIconStyle = {
    color: "red",
    cursor: "pointer", // Add cursor style
    fontSize: "18px", // Make the icon 1.5 times bigger (adjust the size as needed)
    border: "none", // Remove the border
    marginLeft: "900px", // Move the icon to the right by 200px
    backgroundColor:"transparent"
  };

  const cartItemImageStyle = {
    borderRadius: "5px", // Apply rounded corners to the image
  };

   // Style for labels (Subtotal, Total, Delivery Fees)
   const labelStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "right",
  };

  // Style for values (subtotal and total)
  const valueStyle = {
    fontSize: "18px",
    textAlign: "left",
  };

   // Style for the "Proceed to Checkout" button
   const checkoutButtonStyle = {
    backgroundColor: "#007bff", // Blue color
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "50px", // Push the button more to the bottom
    marginBottom:"50px"
  };
  return (
    <div className="cart">
<h2 style={{ fontSize: "48px" }}>My Cart</h2>
      {medicine.map((item, index) => (
        <div key={item.id}>
          {/* <div style={lineStyle}></div> */}
          <div style={cartItemStyle}>
            <div style={buttonsContainerStyle}>
              <button
                style={plusMinusButtonStyle}
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
              <div style={quantityStyle}>{item.quantity}</div>
              <button
                style={plusMinusButtonStyle}
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
            </div>
            <div className="cart-item-image">
              <img
                src={item.image}
                alt={item.name}
                width="50"
                height="90"
                style={cartItemImageStyle}
              />
            </div>
            <div className="cart-item-details">
              <div className="cart-item-name" style={{quantityStyle,  marginLeft: "10px" ,fontWeight: "bold" }}>
                {item.name}
              </div>
              <div className="cart-item-price"style={{ marginLeft: "10px" }}>{`$${item.price}`}</div>
            </div>
            <button
              onClick={() => handleDeleteItem(item.id)}
              style={trashIconStyle}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
      <div style={lineStyle}></div>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={labelStyle}>Subtotal:</div>
          <div style={valueStyle}>{subtotal.toFixed(2)} LE</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={labelStyle}>Delivery Fees:</div>
          <div style={valueStyle}>{delivery} LE</div>
        </div>
        <div style={lineStyle2}></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={labelStyle}>Total:</div>
          <div style={valueStyle}>{total.toFixed(2)} LE</div>
        </div>
        <div style={lineStyle2}></div>
       

        <div style={{ display: "flex", justifyContent: "right" }}>
  <Link to="/patient/patient-checkout">
    <Button variant="primary" style={checkoutButtonStyle}>
      Proceed to Checkout
    </Button>
  </Link>

  <div style={{ width: "50px" }}></div>

  <Link to="/patient/patient-medicine">
    <Button variant="primary" style={checkoutButtonStyle}>
      Continue Shopping
    </Button>
  </Link>
</div>

      </div>
    </div>
  );
}

export default CartItems;