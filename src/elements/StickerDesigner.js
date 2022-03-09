import api from '../api'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'


const StickerDesigner = () => {
  const [bodyIndex, setBodyIndex] = useState(0)
  const [bodies, setBodies] = useState([{components: [{image_url: ""}], left_eye_cx: 0, left_eye_cy: 0, right_eye_cx: 0, right_eye_cy: 0, mouth_cx: 0, mouth_cy: 0}])
  const [eyesIndex, setEyesIndex] = useState(0)
  const [eyes, setEyes] = useState([{components: [{image_url: "", width: 0, height: 0}, {image_url: "", width: 0, height: 0}]}])
  const [mouthIndex, setMouthIndex] = useState(0)
  const [mouths, setMouths] = useState([{image_url: "", width: 0, height: 0}])
  const [editType, setEditType] = useState("");

  const genImage = () => {
    const body_id = bodies[bodyIndex]['id']
    const eyes_id = eyes[eyesIndex]['id']
    const mouth_id = mouths[mouthIndex]['id']
    api.composeImage(body_id, eyes_id, mouth_id)
   }

  useEffect(() => {
    console.log("HI")
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

  const corner_coordinate = (center_coordinate, length) => {
    return center_coordinate - length/2
  }

  const left_eye_corner = () => {
    const le_cx = bodies[bodyIndex]['left_eye_cx']
    const le_cy = bodies[bodyIndex]['left_eye_cy']
    const eye_width = eyes[eyesIndex]['components'][0]['width']
    const eye_height = eyes[eyesIndex]['components'][0]['height']
    return {x: corner_coordinate(le_cx, eye_width), y: corner_coordinate(le_cy, eye_height)}
  }

  const right_eye_corner = () => {
    const re_cx = bodies[bodyIndex]['right_eye_cx']
    const re_cy = bodies[bodyIndex]['right_eye_cy']
    const eye_width = eyes[eyesIndex]['components'][1]['width']
    const eye_height = eyes[eyesIndex]['components'][1]['height']
    return {x: corner_coordinate(re_cx, eye_width), y: corner_coordinate(re_cy, eye_height)}
  }

  const mouth_corner = () => {
    const m_cx = bodies[bodyIndex]['mouth_cx']
    const m_cy = bodies[bodyIndex]['mouth_cy']
    const mouth_width = mouths[mouthIndex]['width']
    const mouth_height = mouths[mouthIndex]['height']
    return {x: corner_coordinate(m_cx, mouth_width), y: corner_coordinate(m_cy, mouth_height)}
  }

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
        {bodies[bodyIndex].components.map((layer_data, ix) => {
          return <img src={layer_data.image_url}  className={ layer_data.layer >= 0 ? "body" : "body hidden"} key={"layer-"+layer_data.layer}/>
        })}
        <img src={eyes[eyesIndex].components[0].image_url}  className="eye left" style={{left: left_eye_corner()['x'], top: left_eye_corner()['y']}}/>
        <img src={eyes[eyesIndex].components[1].image_url}  className="eye right" style={{left: right_eye_corner()['x'], top: right_eye_corner()['y']}}/>
        <img src={mouths[mouthIndex].image_url}  className="mouth" style={{left: mouth_corner()['x'], top: mouth_corner()['y']}} />
      </div>
      <div>
        <Button onClick={ () => genImage() } >Generate Images</Button>
      </div>
    </div>
  )
}

export default StickerDesigner;
