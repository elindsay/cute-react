import api from '../api'
import React, { useState, useEffect, useCallback } from 'react'
import { ToggleButton, Table} from 'react-bootstrap'
import AdminCompositeEditor from '../elements/AdminCompositeEditor'

const fileTypes = ["PNG"];

const AdminApp = () => {
  const [editType, setEditType] = useState("list")
  const [components, setComponents] = useState([])
  
  useEffect(() => {
    api.getComponents().then((result) => {
      setComponents(result.data)
    })
  }, [components])

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
          <AdminCompositeEditor />
      }
    </div>
  )
}

export default AdminApp;
