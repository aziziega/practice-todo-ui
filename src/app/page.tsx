"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
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
import ConnectButton from "@/components/ConnectWalletButton";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../config/index";
import { TODOLIST_ABI, TODOLIST_ADDRESS } from "@/constants";

const todolistContract = {
  address: TODOLIST_ADDRESS as `0x${string}`,
  abi: TODOLIST_ABI,
};

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState("");
  const { isConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { data, refetch } = useReadContract({
    ...todolistContract,
    functionName: "getTasks",
    account: address as `0x${string}`,
    query: {
      enabled: isConnected,
      refetchInterval: 1000,
    },
  });

  const todos: Todo[] = (data as Todo[]) || [];

  async function handleAddTask() {
    toast.loading("Finishing your mutation...", {
      style: {
        background: "#2B2F36",
        color: "#fff",
      },
    });
    const result = await writeContractAsync(
      {
        ...todolistContract,
        functionName: "createTask",
        args: [task],
        account: address as `0x${string}`,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.loading("Adding your task...", {
            style: {
              background: "#2B2F36",
              color: "#fff",
            },
          });
        },
        onError: () => {
          toast.dismiss();
          toast.error("Failed to add task", {
            style: {
              background: "#2B2F36",
              color: "#fff",
            },
          });
        },
      }
    );
    await waitForTransactionReceipt(config, {
      hash: result as `0x${string}`,
    })
      .then(() => {
        toast.dismiss();
        toast.success("Task Successfully Added!", {
          style: {
            background: "#2B2F36",
            color: "#fff",
          },
        });
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Failed to add task", {
          style: {
            background: "#2B2F36",
            color: "#fff",
          },
        });
      });

    setTask("");
  }

  async function handleFinishTask(id: number) {
    toast.loading("Finishing your mutation...", {
      style: {
        background: "#2B2F36",
        color: "#fff",
      },
    });
    const result = await writeContractAsync(
      {
        ...todolistContract,
        functionName: "completeTask",
        args: [id],
        account: address as `0x${string}`,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.loading("Completing your task...", {
            style: {
              background: "#2B2F36",
              color: "#fff",
            },
          });
        },
        onError: () => {
          toast.dismiss();
          toast.error("Failed to complete task", {
            style: {
              background: "#2B2F36",
              color: "#fff",
            },
          });
        },
      }
    );
    await waitForTransactionReceipt(config, {
      hash: result as `0x${string}`,
    })
      .then(() => {
        toast.dismiss();
        toast.success("Task Successfully Completed!", {
          style: {
            background: "#2B2F36",
            color: "#fff",
          },
        });
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Failed to complete task", {
          style: {
            background: "#2B2F36",
            color: "#fff",
          },
        });
      });
  }

  async function handleDeleteTask(id: number) {
    toast.loading("Finishing your mutation...", {
      style: {
        background: "#2B2F36",
        color: "#fff",
      },
    });
    const result = await writeContractAsync(
      {
        ...todolistContract,
        functionName: "removeTask",
        args: [id],
        account: address as `0x${string}`,
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.loading("Removing your task...", {
            style: {
              background: "#2B2F36",
              color: "#fff",
            },
          });
        },
        onError: () => {
          toast.dismiss();
          toast.error("Failed to delete task", {
            style: {
              background: "#2B2F36",
              color: "#fff",
            },
          });
        },
      }
    );
    await waitForTransactionReceipt(config, {
      hash: result as `0x${string}`,
    })
      .then(() => {
        toast.dismiss();
        toast.success("Task Successfully Removed!", {
          style: {
            background: "#2B2F36",
            color: "#fff",
          },
        });
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Failed to delete task", {
          style: {
            background: "#2B2F36",
            color: "#fff",
          },
        });
      });
  }

  if (!isConnected) {
    return (
      <section className="vh-100 d-flex justify-content-center align-items-center">
        <div className="bg-[#2B2F36] p-4 rounded-lg flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center mb-1">
            <h4 className="text-center font-bold" style={{ color: "#fff" }}>
              Basic <span className="text-green-500">Smart Contract</span> Todo
              UI
            </h4>
            <span
              className="text-center my-3 pb-3 text-sm"
              style={{ color: "#fff", opacity: 0.5 }}
            >
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
          <MDBCol md="12" xl="7">
            <MDBCard
              className="rounded-3"
              style={{ backgroundColor: "#202127" }}
            >
              <MDBCardBody className="p-4">
                <h4
                  className="text-center my-3 pb-3 font-bold"
                  style={{ color: "#fff" }}
                >
                  Basic <span className="text-green-500">Smart Contract</span>{" "}
                  Todo UI
                </h4>
                <div className="w-full flex items-center justify-center mb-4">
                  <ConnectButton />
                </div>
                <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                  <MDBCol size="12">
                    <MDBInput
                      label="Enter a task here"
                      labelStyle={{ color: "#fff", fontSize: "0.8rem" }}
                      id="form1"
                      type="text"
                      style={{
                        backgroundColor: "#2B2F36",
                        color: "#fff",
                        fontSize: "1rem",
                      }}
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                    />
                  </MDBCol>
                  <MDBCol size="12">
                    <MDBBtn type="button" onClick={handleAddTask}>
                      Save
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol size="12">
                    <MDBBtn type="button" color="warning" onClick={refetch}>
                      Refresh
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
                <MDBTable
                  className="mb-4"
                  style={{ backgroundColor: "#2B2F36", color: "#fff" }}
                >
                  <MDBTableHead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Todo item</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {todos && todos.length > 0 ? (
                      todos
                        .filter((todo: any) => !todo.completed)
                        .map((todo: any, index: number) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{todo.task}</td>
                            <td>
                              {todo.completed ? "Completed" : "In progress"}
                            </td>
                            <td>
                              <MDBBtn
                                type="button"
                                color="danger"
                                onClick={() => handleDeleteTask(todo.id)}
                              >
                                Delete
                              </MDBBtn>
                              <MDBBtn
                                type="button"
                                color="success"
                                className="ms-1"
                                onClick={() => handleFinishTask(todo.id)}
                              >
                                Finished
                              </MDBBtn>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No tasks found
                        </td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>
                <p className="text-center py-2 bg-green-500 text-white text-md font-semibold rounded-sm">
                  Completed
                </p>
                <MDBTable
                  className="mb-4"
                  style={{ backgroundColor: "#2B2F36", color: "#fff" }}
                >
                  <MDBTableHead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Todo item</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {todos && todos.length > 0 ? (
                      todos
                        .filter((todo: any) => todo.completed)
                        .map((todo: any, index: number) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{todo.task}</td>
                            <td>
                              {todo.completed ? "Completed" : "In progress"}
                            </td>
                            <td>
                              <MDBBtn
                                type="button"
                                color="danger"
                                onClick={() => handleDeleteTask(todo.id)}
                              >
                                Delete
                              </MDBBtn>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No completed tasks found
                        </td>
                      </tr>
                    )}
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
