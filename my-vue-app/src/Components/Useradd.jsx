import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Useradd() {
  // const naviget = useNavigate();
  const [UserData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const hendleInput = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setUserData((pre) => {
  //     return { ...pre, [name]: value };
  //   });
  // };

  const [img, setimg] = useState("");

  const hendleInput = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setUserData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleImg = (e) => {
    setimg(e.target.files[0]);
    console.log(e.target.files);
  };

  const hendleSubmit = async (e) => {
    e.preventDefault();

    const filedata = new FormData();

    filedata.append("profile_pic", img);
    filedata.append("name", UserData.name);
    filedata.append("email", UserData.email);
    filedata.append("password", UserData.password);

    let url = "http://localhost:8080/profile";

    axios.post(url, filedata).then((res) => alert(res.data.message));
  };

  return (
    <>
      <div
        className="  mt-5  col-md-6 offset-md-3  "
        style={{
          padding: "50px 50px ",
          borderRadius: "30px",
          boxShadow: "0rem 3rem 10rem 3rem grey",
        }}
      >
        <h1 className="text-center">User Form</h1>
        <Form onSubmit={hendleSubmit}>
          <Form.Group className="mt-3 mb-3">
            <Form.Label className="form-control border-0 ">
              Profile_Pic
            </Form.Label>
            <Button variant="contained" component="label">
              Upload
              <input
                // hidden
                accept="image/*"
                // multiple
                type="file"
                name="imgdata"
                onChange={handleImg}
              />
            </Button>
            <img
              className="mx
            -5"
              src={img}
              alt="preview img"
              width="150px"
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
              required
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
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 ">
            <Form.Label> Password </Form.Label>
            <input
              className=" form-control  shadow border-0 "
              type="password"
              id="password"
              placeholder="Enter Your Password"
              name="password"
              value={UserData.password}
              onChange={hendleInput}
              required
            />
          </Form.Group>

          <Button
            onSubmit={hendleSubmit}
            className="shadow "
            variant="outlined"
            color="success"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
