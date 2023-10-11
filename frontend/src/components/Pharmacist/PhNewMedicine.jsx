import { useState } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

function MedicineForm({ onClose, fetchData }) {
  const [medicineName, setMedicineName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [medicinalUse, setMedicinalUse] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [sales, setSales] = useState(null);
  const [picture, setPicture] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSave = async (e) => {
    console.log("wselt henaaaa");
    e.preventDefault();
    setError(null);
    if (
      medicineName == null ||
      price == null ||
      description == null ||
      medicinalUse == null ||
      quantity == null ||
      sales == null ||
      ingredients == null
    ) {
      setError("Please fill in all the required fields");
      return;
    }

    try {
      console.log("wselt hena before method");
      onClose();
      const response = await axios.post("/newMedicine", {
        picture: picture,
        name: medicineName,
        price: price,
        description: description,
        quantity: quantity,
        sales: sales,
        activeIngredients: ingredients,
        medicinalUse: medicinalUse,
      });
      console.log("wselt hena b3d el method");

      if (response.status === 200) {
        console.log("here");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false); // Clear the error after 5 seconds
        }, 5000);
        fetchData();
      } else if (response.status === 500) {
        setError("Medicine not found");
      } else {
        setError("Error");
      }
    } catch (error) {
      setSuccess(false);
      if (error.response && error.response.status === 500) {
        setError("Server error");
      } else {
        setError(error.response.status);
      }
    }
    setTimeout(() => {
      setError(null); // Clear the error after 5 seconds
    }, 5000);
  };

  return (
    <Card className="mb-4 mx-3 bg-light">
      <Card.Header className="text-center">Add New Medicine</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Medicine Name</Form.Label>
            <Form.Control
              type="text"
              name="medicineName"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Medicinal Use</Form.Label>
            <Form.Control
              type="text"
              name="medicinalUse"
              value={medicinalUse}
              onChange={(e) => setMedicinalUse(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Active Ingredients</Form.Label>
            <Form.Control
              type="text"
              name="medicinalUse"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sales</Form.Label>
            <Form.Control
              type="number"
              name="sales"
              value={sales}
              onChange={(e) => setSales(e.target.value)}
            />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
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
      </Card.Body>
    </Card>
  );
}
export default MedicineForm;
