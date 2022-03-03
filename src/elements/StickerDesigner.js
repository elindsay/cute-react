import api from '../api'
import React, { useState, useEffect } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const StickerDesigner = () => {
  const [bodyIndex, setBodyIndex] = useState(0)
  const [bodies, setBodies] = useState([{layers: [{signed_url: ""}]}])
  const [eyesIndex, setEyesIndex] = useState(0)
  const [eyes, setEyes] = useState([{layers: [{signed_url: ""}, {signed_url: ""}]}])
  const [mouthIndex, setMouthIndex] = useState(0)
  const [mouths, setMouths] = useState([{signed_url: ""}])
  const [editType, setEditType] = useState("");

  useEffect(() => {
    api.getEyeComposites().then((result) => {
      setEyes(result.data)
    })
    api.getMouthComponentImages().then((result) => {
      setMouths(result.data)
    })
    api.getBodyComposites().then((result) => {
      setBodies(result.data)
    })
  }, []);

  return(
    <div>
      <h4>Design a Sticker!</h4>
      <div className="editTypeSelector">
        <ToggleButtonGroup type="radio" value={editType} name="editType" onChange={(val) => setEditType(val)}>
          <ToggleButton id="tbg-btn-1" value={"animal"} onClick={ () => setBodyIndex((bodyIndex + 1)%bodies.length) } variant="outline-primary" className="border-2">
            Animal
          </ToggleButton>
          <ToggleButton id="tbg-btn-2" value={"eyes"} onClick={ () => setEyesIndex((eyesIndex + 1)%eyes.length) } variant="outline-primary" className="border-2">
             Eyes
          </ToggleButton>
          <ToggleButton id="tbg-btn-3" value={"mouth"} onClick={ () => setMouthIndex((mouthIndex + 1)%mouths.length) } variant="outline-primary" className="border-2">
            Mouth
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="subeditTypeSelector">
        { editType == "animal" &&
          <ToggleButtonGroup type="radio" value={editType} name="editType" onChange={(val) => setEditType(val)}>
            <ToggleButton id="tbg-btn-1" value={"animal"} onClick={ () => setBodyIndex((bodyIndex + 1)%bodies.length) } variant="outline-primary" className="border-2">
              <FontAwesomeIcon icon={faArrowLeft} />
            </ToggleButton>
            <ToggleButton id="tbg-btn-1" value={"animal"} onClick={ () => setBodyIndex((bodyIndex + 1)%bodies.length) } variant="outline-primary" className="border-2">
              <FontAwesomeIcon icon={faArrowRight} />
            </ToggleButton>
            <ToggleButton id="tbg-btn-2" value={"eyes"} onClick={ () => setEyesIndex((eyesIndex + 1)%eyes.length) } variant="outline-primary" className="border-2">
               Color
            </ToggleButton>
          </ToggleButtonGroup>
        }
        { editType == "eyes" &&
          <ToggleButtonGroup type="radio" value={editType} name="editType" onChange={(val) => setEditType(val)}>
            <ToggleButton id="tbg-btn-1" value={"animal"} onClick={ () => setBodyIndex((bodyIndex + 1)%bodies.length) } variant="outline-primary" className="border-2">
              <FontAwesomeIcon icon={faArrowLeft} />
            </ToggleButton>
            <ToggleButton id="tbg-btn-1" value={"animal"} onClick={ () => setBodyIndex((bodyIndex + 1)%bodies.length) } variant="outline-primary" className="border-2">
              <FontAwesomeIcon icon={faArrowRight} />
            </ToggleButton>
            <ToggleButton id="tbg-btn-2" value={"eyes"} onClick={ () => setEyesIndex((eyesIndex + 1)%eyes.length) } variant="outline-primary" className="border-2">
               Color
            </ToggleButton>
          </ToggleButtonGroup>
        }
        { editType == "mouth" &&
          <ToggleButtonGroup type="radio" value={editType} name="editType" onChange={(val) => setEditType(val)}>
            <ToggleButton id="tbg-btn-1" value={"animal"} onClick={ () => setBodyIndex((bodyIndex + 1)%bodies.length) } variant="outline-primary" className="border-2">
              <FontAwesomeIcon icon={faArrowLeft} />
            </ToggleButton>
            <ToggleButton id="tbg-btn-1" value={"animal"} onClick={ () => setBodyIndex((bodyIndex + 1)%bodies.length) } variant="outline-primary" className="border-2">
              <FontAwesomeIcon icon={faArrowRight} />
            </ToggleButton>
          </ToggleButtonGroup>
        }
      </div>
      <div className="designer">
        {bodies[bodyIndex].layers.map((layer_data, ix) => {
          return <img src={layer_data.signed_url}  className={ layer_data.layer >= 0 ? "body" : "body hidden"} key={"layer-"+layer_data.layer}/>
        })}
        <img src={eyes[eyesIndex].layers[0].signed_url}  className="eye left" style={{left: bodies[bodyIndex]['eye_offset'], top: bodies[bodyIndex]['eye_top']}}/>
        <img src={eyes[eyesIndex].layers[1].signed_url}  className="eye right" style={{right: bodies[bodyIndex]['eye_offset'], top: bodies[bodyIndex]['eye_top']}}/>
        <img src={mouths[mouthIndex].signed_url}  className="mouth" style={{left: bodies[bodyIndex]['mouth_offset'], top: bodies[bodyIndex]['mouth_top']}} />
      </div>
    </div>
  )
}

export default StickerDesigner;
