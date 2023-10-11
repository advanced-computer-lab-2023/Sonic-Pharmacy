import React, {useState} from "react";
import AdminViewTable from "../../components/Admin/AdminViewTable";
import AdminSearchBar from "../../components/Admin/AdminSearchBar";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import AdminBurgerMenu from "../../components/Admin/AdminBurgerMenu";
import { Button, Container } from "react-bootstrap";
import AddNewAdmin from "../../forms/AddNewAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function AdminAdminsPage() {


  return (
    <>
    <AppNavbar hamburgerMenu={<AdminBurgerMenu />} />
    <div
      style={{
        marginTop: "50px",
        color: "var(--body-text-body-color, #212529)",
        // fontSize: "35px",
        fontSize:"2rem",
        fontWeight: "600",
        // fontFamily: "Vibur",
        textAlign: "center",
        lineHeight: "120%",
      }}
    >
      Registered Admins
    </div>
    <Container
      className="bg-white px-5 py-4 d-flex align-items-center justify-content-center"
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        marginLeft: "100px",
      }}
    >
      

      <AdminSearchBar/>
      <AdminViewTable/>
    </Container>
  </>
  )
}
