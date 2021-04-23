import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { AiFillCloseSquare } from "react-icons/ai";
import { AiFillCheckSquare } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

const Tasks = (props) => {
  const [index, setIndex] = useState(null);

  const [tasks, setTasks] = useState([]);
  const addTask = (data) => {
    let arr = [
      ...tasks,
      {
        name: data.name,
        description: data.description,
        state: "non complétée",
      },
    ];
    setTasks(arr);
    localStorage.setItem("tasks", JSON.stringify(arr));
    toast.success("La tâche a été ajoutée avec succès!");
  };
  const deleteItem = (i) => {
    let arr = tasks.filter((item, index) => index !== i);
    setTasks(arr);
    localStorage.setItem("tasks", JSON.stringify(arr));
    toast.success("La tâche a été supprimée avec succès!");
  };
  const updateItemState = (i, newState) => {
    let arr = tasks.map((item, index) =>
      index === i ? { ...item, state: newState } : item
    );
    setTasks(arr);
    localStorage.setItem("tasks", JSON.stringify(arr));
    toast.success(`Tâche marque comme ${newState}!`);
  };
  useEffect(() => {
    let arr = JSON.parse(localStorage.getItem("tasks"));

    arr && setTasks(arr);
  }, []);

  const [modal, setModal] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: "onBlur" });
  const updatetask = (task, index) => {
    setIndex(index);
    const fields = ["name", "description"];
    fields.forEach((field) => setValue(field, task[field]));
    toggle();
  };
  const toggle = () => setModal(!modal);
  const onSubmit = (data) => {
    console.log(data);

    let arr = tasks.map((item, i) =>
      i === index
        ? { ...item, name: data.name, description: data.description }
        : item
    );
    setTasks(arr);
    localStorage.setItem("tasks", JSON.stringify(arr));
    toggle();
    toast.success("La tâche a été modifiée avec succès");
  };
  return (
    <div className="w-75 mx-auto">
      <ToastContainer />
      <h1 className="mb-4">Liste des Tâches</h1>
      <Table>
        <tbody>
          {tasks.length > 0 &&
            tasks.map((task, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <th>
                    <span className="d-inline-block mr-1">{task.name} :</span>
                    <span className="d-inline-block mr-1 font-weight-normal">
                      {task.description}
                    </span>
                    <span
                      className="d-inline-block  font-weight-normal text-danger"
                      role="button"
                      onClick={() => deleteItem(index)}
                    >
                      <AiFillDelete />
                    </span>
                  </th>
                  <th>
                    <span
                      className={`${
                        task.state === "complétée"
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {task.state}
                    </span>
                  </th>
                  <th>
                    <span
                      className="d-inline-block mr-2"
                      role="button"
                      onClick={() => updateItemState(index, "non complétée")}
                    >
                      <AiFillCloseSquare className="text-danger" />
                    </span>
                    <span
                      className="d-inline-block mr-2"
                      role="button"
                      onClick={() => updateItemState(index, "complétée")}
                    >
                      <AiFillCheckSquare className="text-success" />
                    </span>
                    <span
                      role="button"
                      onClick={() => {
                        updatetask(task, index);
                      }}
                    >
                      <AiFillEdit className="text-info" />
                    </span>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}>
                        Modifier la tâche
                      </ModalHeader>
                      <ModalBody>
                        <div className="w-100 mx-auto">
                          <Form onSubmit={handleSubmit(onSubmit)} className="">
                            <FormGroup>
                              <Label for="name">Nom</Label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Nom de la tâche"
                                {...register("name", {
                                  required: "Ceci est obligatoire",
                                })}
                              />
                              <div className="text-danger">
                                {errors.name && errors.name.message}
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <Label for="description">Description</Label>
                              <input
                                className="form-control"
                                type="text"
                                {...register("description", {
                                  required: "Ceci est obligatoire",
                                })}
                                name="description"
                                id="description"
                                placeholder="Description de la tâche"
                              />
                              <div className="text-danger">
                                {errors.description &&
                                  errors.description.message}
                              </div>
                            </FormGroup>
                            <Button type="submit" className="mt-3">
                              Modifier la tâche
                            </Button>
                          </Form>
                        </div>{" "}
                      </ModalBody>
                    </Modal>
                  </th>
                </tr>
              );
            })}
          {tasks.length === 0 && (
            <tr>
              <th scope="row" colSpan="4" className="text-center">
              Liste vide!
              </th>
            </tr>
          )}
        </tbody>
      </Table>
      <AddTask addTask={addTask} />
    </div>
  );
};

export default Tasks;
