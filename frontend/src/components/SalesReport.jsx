import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function SalesReportPage() {
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
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const currentMonth = months[currentDate.getMonth()];
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMonthName, setSelectedMonthName] = useState(currentMonth);
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

  const handleFilterMonth = async () => {
    console.log("selectedMonth", selectedMonth);
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
    } else {
      try {
        const response = await axios.get("/monthlySales", {
          params: {
            month: currentMonthIndex,
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
    }
  };

  const handleFilter = async () => {
    console.log("selectedMedicine", selectedMedicine);
    console.log("selectedDate", selectedDate);

    // if (selectedMonth === "") {
    //   try {
    //     const response = await axios.get("/monthlySales", {
    //       params: {
    //         month: "",
    //       },
    //     });
    //     if (response.status === 200) {
    //       setSales(response.data);
    //       console.log("response.data", response.data);
    //     } else {
    //       console.log("Server error");
    //     }
    //   } catch (error) {
    //     if (error.response && error.response.status === 404) {
    //       setError("Not found.");
    //     } else if (error.response && error.response.status === 500) {
    //       setError("Server Error");
    //     }
    //   }
    // } else
    if (selectedMedicine !== "" || selectedDate !== "") {
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
    } else if (selectedMedicine === "" || selectedDate === "") {
      try {
        const response = await axios.get("/filteredSales", {
          params: {
            medicineNames: "",
            startDate: "",
            endDate: "",
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
    handleFilter();
    handleFilterMonth();
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
  const handleMonthChange = (e) => {
    setSelectedMonthName(e.target.value);
    const selectedMonthName = e.target.value;
    const newIndex = months.indexOf(selectedMonthName);

    if (newIndex !== -1) {
      setSelectedMonth(newIndex);
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="px-2">
          {" "}
          {/* Adjusted width to 2/3 */}
          <Container
            className=" px-10"
            style={{
              flexShrink: 0,
              width: "100%", // Adjusted width to take full width
              border: "3px solid var(--gray-400, #ced4da)",
              background: "var(--gray-white, #fff)",
              padding: "0.5rem", // Adjusted padding to make it thinner
              // marginLeft:"7.3rem"
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
                  Filter Sales Report By Medicine/Date
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
                  Medicine
                </div>

                <div
                  style={{ position: "relative", display: "inline-block" }}
                  className="d-flex"
                >
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
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "1rem",
                      transform: "translateY(-50%)",
                    }}
                  />
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

              <Col xs={12} md={3} className="">
                <Button
                  className="custom-button"
                  onClick={handleFilter}
                  style={{
                    // marginLeft: "4rem", // Adjusted margin-left
                    fontSize: "1rem",
                    width: "7rem",
                    // Adjusted font size
                    marginTop: "7.5rem",
                    marginLeft: "0.8rem",
                  }}
                >
                  Apply
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
        {/* Second Filter Container */}
        {/* <div style={{ width: "10px" }}></div> */}

        <Col xs={12} md={4} lg={3} className="d-flex px-2">
          {" "}
          {/* Adjusted width to 1/3 */}
          <Container
            className=" mx-1 "
            style={{
              flexShrink: 0,
              width: "100%", // Adjusted width to take full width
              border: "3px solid var(--gray-400, #ced4da)",
              background: "var(--gray-white, #fff)",
              height: "11.9rem",
              padding: "0.5rem", // Adjusted padding to make it thinner
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
                  Filter Sales Report By Month
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

                <div
                  style={{ position: "relative", display: "inline-block" }}
                  className="d-flex"
                >
                  <Form.Control
                    as="select"
                    onChange={handleMonthChange}
                    value={selectedMonthName}
                    style={{ width: "100%" }} // Adjusted width
                  >
                    <option value="">Select Month</option>
                    {months.map((use, index) => (
                      <option key={index} value={use}>
                        {`${use}`}
                      </option>
                    ))}
                  </Form.Control>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "1rem",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>

                <Col xs={12} md={3} className="px-5 py-2">
                  <Button
                    className="custom-button"
                    onClick={handleFilterMonth}
                    style={{
                      marginLeft: "7rem", // Adjusted margin-left
                      fontSize: "1rem",
                      width: "7rem",
                      height: "2.7rem",
                      // Adjusted font size
                      marginBottom: "3rem",
                    }}
                  >
                    Apply
                  </Button>
                </Col>
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
