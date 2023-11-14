import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import HamburgerMenu from "../../components/Patient/PatientHamburgerMenu";
import PatientShowMedicine from "../../components/Patient/PatientShowMedicine";
import FilterMedicine from "../../components/FilterMedicine";

function PatientMedicine() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<HamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4">
          <Row>
            <Col xs={12} md={5}>
              <FilterMedicine />
            </Col>
            <Col xs={12} md={7}>
              <PatientShowMedicine />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default PatientMedicine;
