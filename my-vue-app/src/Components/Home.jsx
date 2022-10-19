import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [myData, setMyData] = useState([]);

  const naviget = useNavigate();

  useEffect(() => {
    getdata();
  }, []);

  function getdata() {
    let url = "http://localhost:8080/get";
    axios.get(url).then((res) => setMyData(res.data));
  }

  function handledelet(id) {
    const url = `http://localhost:8080/delet/${id}`;

    axios.delete(url).then(function (res) {
      getdata();
      alert(res.data.message);
    });
  }
  return (
    <>
      <div
        className=" container  table-responsive-lg mt-5 pt-1 pb-5 table  table-responsive-sm  table-responsive-md"
        style={{
          boxShadow: "0rem 2rem 5rem 3rem grey",
          borderRadius: "1rem",
        }}
      >
        <h1 className="text-center mt-5">User Data</h1>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr className="table-dark">
              <th>id</th>
              <th> Name</th>
              <th>Email</th>
              <th>profile_pic</th>

              <th>Actions</th>
            </tr>
          </thead>
          {myData.map((curElm, _id) => {
            return (
              <tbody key={_id}>
                <tr>
                  <td> {_id + 1} </td>
                  <td>{curElm.name} </td>
                  <td> {curElm.email} </td>
                  <td>
                    {" "}
                    <img src={curElm.profile_path} alt="img" width="100px" />
                  </td>

                  <td className="d-flex">
                    <Button
                      variant="success"
                      onClick={() => naviget(`about/${curElm._id}`)}
                    >
                      Edit
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => handledelet(curElm._id)}
                    >
                      Delet
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    </>
  );
}
