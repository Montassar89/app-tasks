import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



export default function EditTask({ updateTask,task,open }) {
  console.log(open)
  const [modal, setModal] = useState(open);
  console.log(modal)

  const toggle = () => setModal(!modal);
  const { register, formState: { errors } ,reset, handleSubmit } = useForm();
  const onSubmit = (data) => {
    updateTask(data)
  };
  useEffect(()=>{
    // reset(task)
    setModal(open)
  },[open])

  return(
    <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}><h1>Modifier Tâche</h1></ModalHeader>
    <ModalBody>
    <div className="w-100 mx-auto">
      
      <Form onSubmit={handleSubmit(onSubmit)} className="">
      <FormGroup>
        <Label for="name">Nom</Label>
        <Input type="name" name="name"
         id="name" placeholder="Nom de la tâche"
         {...register('name', {
          required: 'Ceci est obligatoire',
        })} />
        <div className="text-danger">{errors.name && errors.name.message}</div>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="text" 
         {...register('description', {
          required: 'Ceci est obligatoire',
        })}
        name="description" id="description" placeholder="Description de la tâche" />
        <div className="text-danger">{errors.description && errors.description.message}</div>
      </FormGroup>
      <Button type="submit" className="mt-3">Modifier la tâche</Button>
    </Form>
    </div>    </ModalBody>
  </Modal>

  )
}

