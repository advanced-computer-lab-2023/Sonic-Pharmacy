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
  //const [picture, setPicture] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // New state variable for the selected image file

  const handleSave = async (e) => {
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
      onClose();
      const activeIngredientsArray = ingredients.split("-");
      let picture = null;
      if (setSelectedImage != null) {
        // Read the file as a data URL
        // Create a FileReader instance
        const reader = new FileReader();
        // Set the image once loaded into file reader
        reader.onload = async (e) => {
          const img = new Image();
          img.src = reader.result;

          img.onload = async () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const targetWidth = 100;
            const targetHeight = (targetWidth / img.width) * img.height;

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            const base64ImageData = canvas.toDataURL("image/jpeg");
            picture = base64ImageData;

            console.log(picture);

            console.log("sending response");
            const response = await axios.post("/newMedicine", {
              picture: selectedImage,
              name: medicineName,
              price: price,
              description: description,
              quantity: quantity,
              sales: sales,
              activeIngredients: activeIngredientsArray,
              medicinalUse: medicinalUse,
              picture: picture,
            });

            console.log(response);

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
          };
          // let imageSrc = reader.result.split(",")[1];
          // imageSrc = "data:image/jpeg;base64," + imageSrc + "";
          // console.log(imageSrc);

          // picture = imageSrc;
        };

        reader.readAsDataURL(selectedImage);
      }
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  };

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
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
              as="select"
              name="medicinalUse"
              value={medicinalUse}
              onChange={(e) => setMedicinalUse(e.target.value)}
            >
              <option value="">Select Medicinal Use</option>
              <option value="Pain Relief">Pain Relief</option>
              <option value="Fever Relief">Fever Relief</option>
              <option value="Allergy Relief">Allergy Relief</option>
              <option value="Digestive Health">Digestive Health</option>
              <option value="Respiratory Relief">Respiratory Relief</option>
              <option value="Anxiety Relief">Anxiety Relief</option>
              <option value="Cholesterol Management">
                Cholesterol Management
              </option>
              <option value="Diabetes Management">Diabetes Management</option>
              <option value="Infection Treatment">Infection Treatment</option>
            </Form.Control>
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
          <Form.Group>
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageUpload}
            />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" onClick={handleSave}>
            Save
          </Button>
          {/* <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button> */}
        </div>
        {error && <div className="error">{error}</div>}
      </Card.Body>
    </Card>
  );
}
export default MedicineForm;
