import React from "react";
import AdminHomeCard from "../../components/Admin/AdminHomeCard";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import { Container, Row } from "react-bootstrap";
import AdminImg from "../../components/Admin/AdminImg";
import AdminBurgerMenu from "../../components/Admin/AdminBurgerMenu";
import {
  faHospitalUser,
  faUserDoctor,
  faUsers,
  faBriefcaseMedical,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminHomePage() {
  return (
    <>
      <AppNavbar hamburgerMenu={<AdminBurgerMenu />} />
      <Container
        className="bg-white px-5 py-4 d-flex align-items-center justify-content-center"
        style={{
          // margin: "20px",
          display: "flex",
          flexDirection: "column",
          // marginLeft: "100px",
        }}
      >
        <Row className="row-sub-container">
          <AdminImg />
        </Row>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <AdminHomeCard
            location="/admin/patients-list"
            cardText="Patients"
            cardDetails="View/Edit Patients"
            icon={faHospitalUser}
          />
          <AdminHomeCard
            location="/admin/pharmacists-list"
            cardText="Pharmacists"
            cardDetails="View/Edit Pharmacists"
            icon={faUserDoctor}
          />
          <AdminHomeCard
            location="/admin/admin-medicine"
            cardText="Medicine"
            cardDetails="View available Medicine"
            icon={faBriefcaseMedical}
          />
          <AdminHomeCard
            location="/admin/admins-list"
            cardText="Admins"
            cardDetails="View/Edit Admins"
            icon={faUsers}
          />
        </div>
      </Container>
    </>
  );
}
