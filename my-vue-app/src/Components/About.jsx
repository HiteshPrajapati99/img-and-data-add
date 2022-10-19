import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const About = () => {
  const { id } = useParams();
  const naviget = useNavigate();

  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  function getdata() {
    axios.get(`http://localhost:8080/edit/get/${id}`).then(function (res) {
      setUserData(res.data.user);
    });
  }

  const hendleInput = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUserData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handlesubmit = () => {
    axios
      .put(`http://localhost:8080/edit/${id}`, UserData)
      .then(function (res) {
        alert(res.data.message);
      });

    naviget("/");
  };

  return (
    <>
      <div
        className="  mt-5  col-md-8  col-lg-8 offset-md-2   "
        style={{
          padding: "50px 50px ",
          borderRadius: "30px",
          boxShadow: "0rem 3rem 10rem 3rem grey",
        }}
      >
        <h1 className="text-center">Edit Form</h1>
        <Form onSubmit={handlesubmit}>
          <Form.Group className="mb-3 ">
            <Form.Label> pic </Form.Label>
            <img
              src={UserData.profile_path}
              alt="img"
              width="200px"
              className="form-control"
            />
            <input
              className=" form-control  shadow border-0 "
              type="file"
              id="file"
              placeholder="Enter Your Name"
              name="file"
            />
          </Form.Group>
          <Form.Group className="mb-3 ">
            <Form.Label> Name </Form.Label>
            <input
              className=" form-control  shadow border-0 "
              type="text"
              id="name"
              placeholder="Enter Your Name"
              name="name"
              value={UserData.name}
              onChange={hendleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <input
              className=" form-control shadow border-0 "
              type="email"
              placeholder="Enter email"
              id="email"
              name="email"
              value={UserData.email}
              onChange={hendleInput}
            />
          </Form.Group>

          <Button className="shadow " variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </>
  );
};

export default About;
