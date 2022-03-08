import api from '../api'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

const fileTypes = ["PNG"];

const AdminApp = () => {
  const [editType, setEditType] = useState("list")
  const [components, setComponents] = useState([])
  const [selectedFile, setSelectedFile] = useState("test");
  const [componentType, setComponentType] = useState("");
  
  useEffect(() => {
    api.getComponents().then((result) => {
      setComponents(result.data)
    })
  }, [components])

  const setFile = (event) => {
    event.preventDefault()
		setSelectedFile(event.target.files[0]);
	};

  const submitComponent = useCallback((event) => {
    event.preventDefault()
    api.uploadComponent(selectedFile, componentType).then((result) => {
      console.log(result)
    })
  });


  return(
    <div className="ContentContainer Admin">
      <h1>Components</h1>
      <ToggleButton 
        id="tbg-btn-1" 
        value={"animal"} 
        onClick={ () => setEditType(editType == "upload" ? "list" : "upload") } 
        variant="outline-primary" 
        className="border-2" 
      >
         Switch to {editType == "upload" ? "list" : "upload"}
      </ToggleButton>
      {editType == "list" &&
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Type</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            { components.map((component, ix) => {
              return (<tr key={"row-"+ix}>
                <td>{component.id}</td>
                <td>{component.c_type}</td>
                <td>
                  <img src={component.signed_url} className="table-img"/>
                </td>
              </tr>)
            })}
          </tbody>
        </Table>
       }
      {editType == "upload" &&
        <Form onSubmit={ (event) =>  submitComponent(event)}>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control 
              type="text" 
              value={componentType} 
              onChange={(event) => setComponentType(event.target.value) } />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange={(event) => setFile(event)} />
          </Form.Group>
          <Button type="submit">Save</Button>
        </Form>
         //image with name & run
        //c_type
      }
    </div>
  )
}

export default AdminApp;
