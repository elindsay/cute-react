import api from '../api'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Form } from 'react-bootstrap'

const AdminCompositeEditor = () => {
  const [selectedFile, setSelectedFile] = useState("test");
  const [components, setComponents] = useState([]);
  const [componentType, setComponentType] = useState("");

  const setFile = (event) => {
    event.preventDefault()
    setSelectedFile(event.target.files[0]);
  };

  const updatePos = (event, comp_id, axis) => {
    console.log(event.target)
    console.log(event.target.value)

    const ix = components.map(function(c) { return c.id; }).indexOf(comp_id);
    const updatedComponents = [...components];
    updatedComponents[ix][axis] = parseInt(event.target.value);
    setComponents(updatedComponents)
  }

  const submitComponent = useCallback((event) => {
    event.preventDefault()
    api.uploadComponent(selectedFile, componentType).then((result) => {
      result.data['x'] = 0
      result.data['y'] = 0
      result.data['layer'] = components.length
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
        <Form.Group controlId="formFile">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={(event) => setFile(event)} />
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
      { components.map((component, ix) => {
        return(
          <div style={{position: 'inline'}} key={"pos-"+ix}>
            id: {component.id} - 
            x: <input 
                 value={component.x} 
                 type="number"
                 onChange={(event) => updatePos(event, component.id, "x")}
            />
            y: <input 
                 value={component.y} 
                 type="number"
                 onChange={(event) => updatePos(event, component.id, "y")}
            />
            layer: <input 
                 value={component.layer} 
                 type="number"
                 disabled={true}
                 onChange={(event) => updatePos(event, component.id, "layer")}
            />
          </div>
        )
      })}
      <div style={{position: 'relative'}}>
        { components.map((component, ix) => {
          return (
            <img 
              src={component.signed_url} 
              key={"img-"+ix} 
              style={{position: 'absolute', left: component.x+"px", top: component.y+"px"}}/>
          )
        })}
      </div>
    </div>
  )
}

export default AdminCompositeEditor;
