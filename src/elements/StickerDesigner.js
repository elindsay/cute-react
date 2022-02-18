import api from '../api'
import React, { useState, useEffect } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import cat from '../assets/component_images/bodies/cat-white.png';
import dog from '../assets/component_images/bodies/dog-white.png';
import lion from '../assets/component_images/bodies/lion-white.png';
import bear from '../assets/component_images/bodies/bear-white.png';
import e1_l from '../assets/component_images/eyes/eye1-left.png';
import e1_r from '../assets/component_images/eyes/eye1-right.png';
import e2_l from '../assets/component_images/eyes/eye2-left.png';
import e2_r from '../assets/component_images/eyes/eye2-right.png';
import e3_l from '../assets/component_images/eyes/eye3-left.png';
import e3_r from '../assets/component_images/eyes/eye3-right.png';
import e4_l from '../assets/component_images/eyes/eye4-left.png';
import e4_r from '../assets/component_images/eyes/eye4-right.png';
import e5_l from '../assets/component_images/eyes/eye5-left.png';
import e5_r from '../assets/component_images/eyes/eye5-right.png';
import m1 from '../assets/component_images/mouths/mouth1.png';
import m2 from '../assets/component_images/mouths/mouth2.png';
import m3 from '../assets/component_images/mouths/mouth3.png';
import m4 from '../assets/component_images/mouths/mouth4.png';
import m5 from '../assets/component_images/mouths/mouth5.png';
import m6 from '../assets/component_images/mouths/mouth6.png';
import m7 from '../assets/component_images/mouths/mouth7.png';

const bodies = [cat, dog, lion, bear]
const bodypos = [
  {mouth_pos: [400, 350], eye_top: 250, eye_offset: 280},
  {mouth_pos: [400, 325], eye_top: 275, eye_offset: 280},
  {mouth_pos: [405, 320], eye_top: 275, eye_offset: 280},
  {mouth_pos: [400, 350], eye_top: 290, eye_offset: 260}
]


const eyes = [[e1_l, e1_r], [e2_l, e2_r], [e3_l, e3_r], [e4_l, e4_r], [e5_l, e5_r]]
const mouths = [m1, m2, m3, m4, m5, m6, m7]


const StickerDesigner = () => {
  const [bodyIndex, setBodyIndex] = useState(0)
  const [eyesIndex, setEyesIndex] = useState(0)
  const [mouthIndex, setMouthIndex] = useState(0)
  const [editType, setEditType] = useState("");

  useEffect(() => {
    api.getComponentImages()
      .then(result => {
        console.log(result)
      })
  });

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
        <img src={bodies[bodyIndex]}  className="body"/>
        <img src={eyes[eyesIndex][0]}  className="eye left" style={{left: bodypos[bodyIndex]['eye_offset'], top: bodypos[bodyIndex]['eye_top']}}/>
        <img src={eyes[eyesIndex][1]}  className="eye right" style={{right: bodypos[bodyIndex]['eye_offset'], top: bodypos[bodyIndex]['eye_top']}}/>
        <img src={mouths[mouthIndex]}  className="mouth" style={{left: bodypos[bodyIndex]['mouth_pos'][0], top: bodypos[bodyIndex]['mouth_pos'][1]}} />
      </div>
    </div>
  )
}

export default StickerDesigner;
