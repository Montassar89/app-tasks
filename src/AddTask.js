import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useForm } from "react-hook-form";

export default function AddTask({ addTask }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    addTask(data);
  };

  return (
    <div className="w-100 mx-auto mt-5">
      <h1>Créer une nouvelle Tâche</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-row  align-items-center"
      >
        <FormGroup className="mr-3">
          <Label for="name">Nom</Label>
          <Input
            type="name"
            name="name"
            id="name"
            placeholder="Nom de la tâche"
            {...register("name", {
              required: "Ceci est obligatoire",
            })}
          />
          <div className="text-danger">
            {errors.name && errors.name.message}
          </div>
        </FormGroup>
        <FormGroup className="mr-3">
          <Label for="description">Description</Label>
          <Input
            type="text"
            {...register("description", {
              required: "Ceci est obligatoire",
            })}
            name="description"
            id="description"
            placeholder="Description de la tâche"
          />
          <div className="text-danger">
            {errors.description && errors.description.message}
          </div>
        </FormGroup>
        <Button type="submit" className="mt-3">
          Ajouter la tâche
        </Button>
      </Form>
    </div>
  );
}
