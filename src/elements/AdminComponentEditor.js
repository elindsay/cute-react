import api from '../api'
import React, { useState, useCallback } from 'react'
import { Button, Form } from 'react-bootstrap'

const AdminComponentEditor = (props) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [components, setComponents] = useState([]);
  const [componentRun, setComponentRun] = useState("");
  const [componentType, setComponentType] = useState("");

  const setFile = (event) => {
    event.preventDefault()
    setSelectedFile(event.target.files[0]);
  };

  const submitComponent = useCallback((event) => {
    event.preventDefault()
    api.uploadComponent(selectedFile, componentType, componentRun).then((result) => {
      setComponents([...components, result.data])
    })
  });

  return(
    <div>
      <Form onSubmit={ (event) =>  submitComponent(event)}>
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control 
            type="text" 
            value={componentType} 
            onChange={(event) => setComponentType(event.target.value) } />
        </Form.Group>
        <Form.Group controlId="run">
          <Form.Label>Run</Form.Label>
          <Form.Control 
            type="text" 
            value={componentRun} 
            onChange={(event) => setComponentRun(event.target.value) } />
        </Form.Group>
        <Form.Group controlId="formFile">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={(event) => setFile(event)} />
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
      <div style={{position: 'relative'}}>
        { components.map((component, ix) => {
          return (
            <img 
              src={component.signed_url} 
              key={"img-"+ix} 
              style={{position: 'relative'}} />
          )
        })}
      </div>
    </div>
  )
}

export default AdminComponentEditor;
