"use client";
import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { useAccount } from "wagmi";
import ConnectButton from "@/components/ConnectWalletButton";

export default function Home() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <section
        className="vh-100 d-flex justify-content-center align-items-center"
      >
        <div className="bg-[#2B2F36] p-4 rounded-lg flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center mb-1">
            <h4 className="text-center font-bold" style={{ color: "#fff" }}>
              Basic <span className="text-green-500">Smart Contract</span> Todo UI
            </h4>
            <span className="text-center my-3 pb-3 text-sm" style={{ color: "#fff", opacity: 0.5 }}>
              Before using this app, please connect your wallet!
            </span>
          </div>
          <ConnectButton />
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="9" xl="7">
            <MDBCard className="rounded-3" style={{ backgroundColor: "#202127" }}>
              <MDBCardBody className="p-4">
                <h4 className="text-center my-3 pb-3 font-bold" style={{ color: "#fff" }}>
                  Basic <span className="text-green-500">Smart Contract</span> Todo UI
                </h4>
                <div className="w-full flex items-center justify-center mb-4">
                  <ConnectButton />
                </div>
                <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                  <MDBCol size="12">
                    <MDBInput
                      label="Enter a task here"
                      labelStyle={{ color: "#fff" }}
                      id="form1"
                      type="text"
                      style={{ backgroundColor: "#2B2F36", color: "#fff" }}
                    />
                  </MDBCol>
                  <MDBCol size="12">
                    <MDBBtn type="submit" onClick={() => open()}>
                      Save
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol size="12">
                    <MDBBtn type="submit" color="warning">
                      Get tasks
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
                <MDBTable className="mb-4" style={{ backgroundColor: "#2B2F36", color: "#fff" }}>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Todo item</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Buy groceries for next week</td>
                      <td>In progress</td>
                      <td>
                        <MDBBtn type="submit" color="danger">
                          Delete
                        </MDBBtn>

                        <MDBBtn type="submit" color="success" className="ms-1">
                          Finished
                        </MDBBtn>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Renew car insurance</td>
                      <td>In progress</td>
                      <td>
                        <MDBBtn type="submit" color="danger">
                          Delete
                        </MDBBtn>

                        <MDBBtn type="submit" color="success" className="ms-1">
                          Finished
                        </MDBBtn>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Sign up for online course</td>
                      <td>In progress</td>
                      <td>
                        <MDBBtn type="submit" color="danger">
                          Delete
                        </MDBBtn>

                        <MDBBtn type="submit" color="success" className="ms-1">
                          Finished
                        </MDBBtn>
                      </td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
                <p className="text-center py-2 bg-green-500 text-white text-md font-semibold rounded-sm">
                  Completed
                </p>
                <MDBTable className="mb-4" style={{ backgroundColor: "#2B2F36", color: "#fff" }}>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Todo item</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Buy groceries for next week</td>
                      <td>Completed</td>
                      <td>
                        <MDBBtn type="submit" color="danger">
                          Delete
                        </MDBBtn>
                      </td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
