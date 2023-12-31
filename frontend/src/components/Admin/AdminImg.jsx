import { Card, Image } from "react-bootstrap";
import mainImg from "../../Assets/Admin/adminHome.png";
import { useSelector } from "react-redux";
import loginAdminReducer from "../../state/loginAdminReducer";

function AdminImg() {
  // const name = useSelector((state) => state.adminLogin.name);
  return (
    <div>
      <Card
        className="d-flex align-items-center justify-content-center rounded"
        style={{
          width: "80rem",
          border: "none",
          position: "relative",
          height: "30rem",
          overflow: "hidden",
        }}
      >
        <Image src={mainImg} style={{ width: "100%" }} />
        <Card
          className="position-absolute text-center bg-transparent"
          style={{
            top: "18%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
          }}
        >
          <Card.Text
            style={{
              marginTop: "27rem",
              color: "white",
              textAlign: "center",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "6rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "120%",
            }}
          >
            Hello!
          </Card.Text>
        </Card>
      </Card>
    </div>
  );
}

export default AdminImg;
