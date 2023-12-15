import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import RegPhoto from "../../components/Guest/RegPhoto";
import GuestBurgerMenu from "../../components/Guest/GuestBurgerMenu";
import OTPVerificationForm from "../../forms/Guest/OTPVerificationForm";
import PasswordChangedForm from "../../forms/Guest/PasswordChangedForm";
import AppNavbarGuest2 from "../../components/AppNavigation/AppNavbarGuest2";

function PasswordChanged() {
  return (
    <div>
      <AppNavbarGuest2 flag={true} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
          <div className="d-flex w-100 align-items-center">
            <div className="col-lg-5 order-lg-2 d-none d-lg-block">
              <RegPhoto />
            </div>
            <div className="col-12 col-lg-7 order-lg-1">
              <PasswordChangedForm />
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default PasswordChanged;
