import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MedicineForm from "./PhNewMedicine";
import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { deleteFilterArray } from "../../state/filterMedicine";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddMedicineModal from "./PhNewMedicineModal";

function PhShowActiveMedicine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const [editedMedicine, setEditedMedicine] = useState(null);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const filterMedicinalUse = useSelector(
    (state) => state.filterMedicine.medicinalUse
  );
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [medicinalUse, setMedicinalUse] = useState(null);
  const [activeIngredients, setActiveIngredients] = useState(null);
  const dispatch = useDispatch();

  const medicineImage = {
    width: "15rem",
    height: "15rem",
  };

  useEffect(() => {
    fetchData();
    dispatch(
      deleteFilterArray({
        medicinalUse: "",
      })
    );
    setEditedMedicine(null);
    console.log(responseData);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/medicines");
      if (response.status === 200) {
        setResponseData(response.data);
        setLoading(false);
      } else {
        setError("Server error");
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  };
  const medicines = responseData;
  console.log(medicines);

  const handleArchiveMedicine = async (med) => {

    try {
        const url = "/deleteMedicine";

        const response = await axios.put(url, {id: med.id});
        if (response.status === 200) {
          fetchData();
        } else if (response.status === 404) {
          setError("Medicine not found");
        } else {
          setError("Error");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Medicine not found");
        } else {
          setError(
            "An error occurred while updating medicine. Please try again later"
          );
        }
      }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      medicine.medicinalUse.includes(filterMedicinalUse)
  );

  const toggleMedicineForm = () => {
    setShowMedicineForm(true);
  };

  const onClose = () => {
    setShowMedicineForm(false);
  };

  const handleEditMedicine = (index) => {
    setEditedMedicine(index);
  };

  const saveMedicine = async (id) => {
    const medicineToUpdate = medicines[editedMedicine];
    const activeIngredientsArray = activeIngredients
      ? activeIngredients.split("-")
      : null;
    const queryParameters = new URLSearchParams({
      _id: id,
      name: medicineToUpdate.name,
      price: price || medicineToUpdate.price,
      description: description || medicineToUpdate.description,
      medicinalUse: medicinalUse || medicineToUpdate.medicinalUse,
      quantity: quantity || medicineToUpdate.quantity,
      activeIngredients:
        activeIngredientsArray || medicineToUpdate.activeIngredients,
    }).toString();
    const url = `/updateMedicine?${queryParameters}`;
    try {
      const response = await axios.put(url, null);
      if (response.status === 200) {
        fetchData();
      } else if (response.status === 404) {
        setError("Medicine not found");
      } else {
        setError("Error");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Medicine not found");
      } else {
        setError(
          "An error occurred while updating medicine. Please try again later"
        );
      }
    }
    setEditedMedicine(null);
    setPrice(null);
    setMedicinalUse(null);
    setDescription(null);
    setQuantity(null);
  };

  return (
    <div>
      {showMedicineForm && (
        <AddMedicineModal fetchData={fetchData} onClose={onClose} />
      )}

      <Form className="my-4 mx-3">
        <Form.Control
          type="text"
          placeholder="Search Medicines"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {filteredMedicines.map((medicine, index) => (
            <Col key={medicine.name} lg={4} md={4} sm={12}>
            <Card className="mb-4 mx-3 bg-light">
                <Card.Header>
                  <div className="d-flex justify-content-end">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{
                        opacity: 1,
                        color: "#099BA0 ",
                        fontSize: "20px",
                        cursor: "pointer",
                        marginBottom: "5px",
                      }}
                      onClick={() => handleEditMedicine(index)}
                    />
                  </div>
                  <div> {medicine.name} </div>
                </Card.Header>
                <Card.Body>
                <div className="medicine-image-container">
                    <img
                      src={medicine.picture}
                      alt={medicine.name}
                      style={{
                        width: "15rem",
                        height: "15rem",
                        margin: "0 auto", // Center the image horizontally
                        display: "block",
                      }}
                    />
                  </div>
                  {editedMedicine === index ? (
                    <div style={{ paddingLeft: "20px"}}>
                      <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={medicine.price}
                          name={medicine.price}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d*\.?\d*$/.test(inputValue)) {
                              setPrice(inputValue);
                            }
                          }}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder={medicine.description}
                          name={medicine.description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Medicinal Use</Form.Label>
                        <Form.Control
                          as="select"
                          name="medicinalUse"
                          onChange={(e) => setMedicinalUse(e.target.value)}
                        >
                          <option value={medicine.medicinalUse}>
                            {medicine.medicinalUse}
                          </option>
                          <option value="Pain Relief">Pain Relief</option>
                          <option value="Fever Relief">Fever Relief</option>
                          <option value="Allergy Relief">Allergy Relief</option>
                          <option value="Digestive Health">
                            Digestive Health
                          </option>
                          <option value="Respiratory Relief">
                            Respiratory Relief
                          </option>
                          <option value="Anxiety Relief">Anxiety Relief</option>
                          <option value="Cholesterol Management">
                            Cholesterol Management
                          </option>
                          <option value="Diabetes Management">
                            Diabetes Management
                          </option>
                          <option value="Infection Treatment">
                            Infection Treatment
                          </option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Active Ingredients</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder={medicine.activeIngredients}
                          name={medicine.activeIngredients}
                          onChange={(e) => setActiveIngredients(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder={medicine.quantity}
                          name={medicine.quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  ) : (
                    <div>
                      <div className="medicine-price" style={{ paddingLeft: '40px' }}>
  <strong>Price:</strong> {medicine.price} LE
</div>

                      <div className="medicine-description" style={{ paddingLeft: '40px' }}>
                      <strong>Description:</strong>  {medicine.description}
                      </div>
                      <div className="medicine-use" style={{ paddingLeft: '40px' }}>
                      <strong>Medicinal Use:</strong> {medicine.medicinalUse}
                      </div>
                      <div className="medicine-activeIngredients" style={{ paddingLeft: '40px' }}>
                      <strong>Active Ingredients:</strong>{" "}
                        {medicine.activeIngredients.map((ingredient, index) => (
                          <div key={index} style={{ marginBottom: "5px" }}>
                            • {ingredient}
                          </div>
                        ))}
                      </div>
                      <div className="medicine-quantity" style={{ paddingLeft: '40px' }}>
                      <strong>Quantity:</strong> {medicine.quantity}
                      </div>
                      <div className="medicine-sales" style={{ paddingLeft: '40px' }}>
                      <strong>Sales:</strong> {medicine.sales} LE
                      </div>
                      
                      
                      <div className="d-flex justify-content-center">
  <button
    className="btn btn-primary mt-3"
    onClick={() => handleArchiveMedicine(medicine._id)}
  >
    Archive Medicine
  </button>
</div>

                    </div>
                  )}
                </Card.Body>
                <Card.Footer>
                  {editedMedicine === index && (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => saveMedicine(medicine._id)}
                    >
                      <Button>Save Changes</Button>
                    </div>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
          <Col lg={6} md={6} sm={12}>
            <Card className="mb-4 mx-3 bg-light">
              <Card.Body className="text-center">
                <Button variant="primary" onClick={toggleMedicineForm}>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add New Medicine
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default PhShowActiveMedicine;