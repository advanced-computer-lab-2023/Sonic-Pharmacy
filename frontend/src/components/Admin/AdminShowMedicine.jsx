import React, { useState, useEffect } from "react";
import { Card, Col, Row, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { deleteFilterArray } from "../../state/filterMedicine";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function AdminShowMedicine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMedicine, setExpandedMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const filterMedicinalUse = useSelector(
    (state) => state.filterMedicine.medicinalUse
  );
  const dispatch = useDispatch();

  const medicineImage = {
    width: "10rem",
    height: "10rem",
  };

  useEffect(() => {
    fetchData();
    dispatch(
      deleteFilterArray({
        medicinalUse: "",
      })
    );
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExpand = (index) => {
    if (expandedMedicine === index) {
      setExpandedMedicine(null);
    } else {
      setExpandedMedicine(index);
    }
  };

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      medicine.medicinalUse.includes(filterMedicinalUse)
  );
  return (
    <div>
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
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <Row>
          {filteredMedicines.map((medicine, index) => (
            <Col key={medicine.medicineName} lg={3} md={4} sm={6}>
              <Card className="mb-4 mx-3 bg-light">
                <Card.Body className="text-center">
                  <div className="medicine-container">
                    <div className="medicine-image-container">
                      <img
                        src={medicine.picture}
                        alt={medicine.name}
                        style={medicineImage}
                      />
                    </div>
                    <div className="details-container">
                      <div className="d-flex justify-content-between align-items-center mb-7 px-3">
                        <div
                          className="medicine-name font-weight-bold"
                          style={{
                            fontSize: "24px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "120%",
                          }}
                        >
                          {medicine.name}
                        </div>
                        <div
                          className="expand-button"
                          onClick={() => handleExpand(index)}
                        >
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                      <div
                        className="info-price-container d-flex justify-content-between align-items-center px-3"
                        style={{
                          color: "#777777",
                          fontSize: "1rem",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "100%",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div className="medicine-price">
                          Price: ${medicine.price}
                        </div>
                      </div>
                      {expandedMedicine === index && (
                        <>
                          <div
                            className="medicine-description"
                            style={{
                              textAlign: "left",
                              paddingLeft: "15px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <h6
                              style={{
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Description:
                            </h6>
                            <p style={{ fontSize: "14px" }}>
                              {medicine.description}
                            </p>
                          </div>
                          <div
                            className="medicine-use"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              paddingLeft: "15px",
                            }}
                          >
                            <h6
                              style={{
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Medicinal Use:
                            </h6>
                            <p style={{ fontSize: "14px" }}>
                              {medicine.medicinalUse}
                            </p>
                          </div>

                          <div
                            className="medicine-activeIngredients"
                            style={{ textAlign: "left", paddingLeft: "15px" }}
                          >
                            <h6
                              style={{
                                marginRight: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              Active Ingredients:
                            </h6>
                            <ul
                              style={{
                                listStyleType: "none",
                                paddingLeft: 0,
                                fontSize: "14px",
                              }}
                            >
                              {medicine.activeIngredients.map(
                                (ingredient, index) => (
                                  <li
                                    key={index}
                                    style={{ marginBottom: "5px" }}
                                  >
                                    • {ingredient}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default AdminShowMedicine;
