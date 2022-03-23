import api from '../api'
import React, { useState, useEffect, useCallback } from 'react'
import { ToggleButton, Table} from 'react-bootstrap'
import AdminComponentEditor from '../elements/AdminComponentEditor'
import ReactGA from 'react-ga';

const fileTypes = ["PNG"];

const AdminApp = () => {
  const [editType, setEditType] = useState("list")
  const [components, setComponents] = useState([])
  
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    api.getComponents().then((result) => {
      setComponents(result.data)
    })
  }, [])

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
        <Table bordered>
          <thead>
            <tr>
              <th>id</th>
              <th>Description</th>
              <th>Components</th>
            </tr>
          </thead>
          <tbody>
            { components.map((component, ix) => {
              return (
                <tr key={"row-"+ix}>
                  <td>{component.id}</td>
                  <td>{component.description}</td>
                  <td><img src={component.image_url} style={{width: '50px'}}/></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
       }
      {editType == "upload" &&
          <AdminComponentEditor />
      }
    </div>
  )
}

export default AdminApp;
