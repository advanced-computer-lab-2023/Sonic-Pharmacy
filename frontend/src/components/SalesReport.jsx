import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";

function SalesReportPage() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [sales, setSales] = useState({
    sales: [],
    totalQuantitySold: 0,
    totalRevenue: 0,
  });

  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleFilter = async () => {
    console.log("selectedMonth", selectedMonth);
    console.log("selectedMedicine", selectedMedicine);
    console.log("selectedDate", selectedDate);

    if (selectedMonth !== "" && selectedMonth !== -1) {
      try {
        const response = await axios.get("/monthlySales", {
          params: {
            month: selectedMonth,
          },
        });
        if (response.status === 200) {
          setSales(response.data);
          console.log("response.data", response.data);
        } else {
          console.log("Server error");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Not found.");
        } else if (error.response && error.response.status === 500) {
          setError("Server Error");
        }
      }
    } else if (selectedMedicine !== "" || selectedDate !== "") {
      try {
        const response = await axios.get("/filteredSales", {
          params: {
            medicineNames: selectedMedicine,
            startDate: selectedDate,
            endDate: selectedDate,
          },
        });
        if (response.status === 200) {
          console.log("response.data", response.data);
          setSales(response.data);
        } else {
          console.log("Server error");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Not found.");
        } else if (error.response && error.response.status === 500) {
          setError("Server Error");
        }
      }
    } else {
      setError("Please select a filter");
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get("/medicines");
      if (response.status === 200) {
        setMedicines(response.data);
      } else {
        console.log("Server error");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No medicines found.");
      } else if (error.response && error.response.status === 500) {
        setError("Server Error");
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/monthlySales");
      if (response.status === 200) {
        setSales(response.data);
      } else {
        console.log("Server error");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Not found.");
      } else if (error.response && error.response.status === 500) {
        setError("Server Error");
      }
    }
  };

  return (
    <div>
      <Row>
        <Col xs={12} md={12}>
          <Container
            className="mx-auto"
            style={{
              flexShrink: 0,
              width: "82%",
              border: "1px solid var(--gray-400, #ced4da)",
              background: "var(--gray-white, #fff)",
              padding: "0.5rem", // Adjusted padding to make it thinner
              marginLeft: "1.3rem",
            }}
          >
            <Row>
              <Col xs={12} md={9}>
                <div
                  style={{
                    fontSize: "18px", // Adjusted font size
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "120%",
                    marginBottom: "0.5rem", // Adjusted margin
                  }}
                >
                  Filter Sales Report
                </div>

                <div
                  style={{
                    color: "#099BA0 ",
                    fontSize: "1rem", // Adjusted font size
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "100%",
                    marginBottom: "0.5rem", // Adjusted margin
                  }}
                >
                  Month
                </div>

                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setSelectedMonth(
                      months.findIndex((value, index) => {
                        return value == e.target.value;
                      })
                    )
                  }
                  style={{ width: "100%" }} // Adjusted width
                >
                  <option value="">Select Month</option>
                  {months.map((use, index) => (
                    <option key={index} value={use}>
                      {`${use}`}
                    </option>
                  ))}
                </Form.Control>

                <div
                  style={{
                    color: "#099BA0 ",
                    fontSize: "1rem", // Adjusted font size
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "100%",
                    marginBottom: "0.5rem", // Adjusted margin
                  }}
                >
                  Medicine
                </div>

                <Form.Control
                  as="select"
                  onChange={(e) => setSelectedMedicine(e.target.value)}
                  style={{ width: "100%" }} // Adjusted width
                >
                  <option value="">Select Medicine</option>
                  {medicines.map((use, index) => (
                    <option key={index} value={use.name}>
                      {`${use.name}`}
                    </option>
                  ))}
                </Form.Control>

                <div
                  style={{
                    color: "#099BA0 ",
                    fontSize: "1rem", // Adjusted font size
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "100%",
                    marginBottom: "0.5rem", // Adjusted margin
                  }}
                >
                  Date
                </div>

                <Form.Control
                  style={{ marginBottom: "1rem" }}
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </Col>

              <Col xs={12} md={3} className="d-flex align-items-end">
                <Button
                  className="custom-button"
                  onClick={handleFilter}
                  style={{
                    height: "38px", // Adjusted height
                    marginLeft: "150px", // Adjusted margin-left
                    fontSize: "14px",
                    // Adjusted font size
                  }}
                >
                  Apply
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <div className="text-center">
            <br></br>
            {/* Table */}
            <Table
              striped
              bordered
              hover
              variant="light"
              style={{ width: "1000px", margin: "auto" }}
            >
              <thead>
                <tr>
                  <th style={{ color: "#099BA0" }}>Medicine Name</th>
                  <th style={{ color: "#099BA0" }}>Quantity</th>
                  <th style={{ color: "#099BA0" }}>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {sales.sales.map((sale, index) => (
                  <tr key={sale.medicineId}>
                    <td>{sale.medicineName}</td>
                    <td>{sale.totalQuantitySold}</td>
                    <td>{sale.totalRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <br></br>
            <Table
              striped
              bordered
              hover
              variant="light"
              style={{ width: "1000px", margin: "auto" }}
            >
              <thead>
                <tr>
                  <th style={{ color: "#099BA0" }}>Total Quantity</th>
                  <th style={{ color: "#099BA0" }}>Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr key={0}>
                  <td>{sales.totalQuantitySold}</td>
                  <td>{sales.totalRevenue}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SalesReportPage;
