import api from '../api'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faArrowUp, faArrowDown, faPaw, faVectorSquare, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return [ width, height ]
}

const StickerDesigner = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [designerScale, setDesignerScale] = useState(1);
  const [frames, setFrames] = useState([{image_url: ""}])
  const [frameIndex, setFrameIndex] = useState(0)
  const [photos, setPhotos] = useState([{image_url: ""}])
  const [photoIndex, setPhotoIndex] = useState(0)
  const [editType, setEditType] = useState("frame")
  const [photoPosition, setPhotoPosition] = useState([0, 200])
  const [photoScale, setPhotoScale] = useState(1)
  const inputFile = useRef(null) 

  const genImage = () => {
    api.createComposite(
      photos[photoIndex],
      frames[frameIndex],
      photoScale,
      photoPosition
    )
   }

  const setDesignerDimensions = (dimensions) => {
    if(dimensions[0] < 768){
      setDesignerScale( dimensions[0]/1000);
    }else{
      setDesignerScale((dimensions[0] - 220)/1000);
    }
  }

  const handleResize = () => {
    const dimensions = getWindowDimensions();
    setWindowDimensions(dimensions);
    setDesignerDimensions(dimensions);
  }

  useEffect(() => {
    api.getComponentsByType('frame').then((result) => {
      setFrames(result.data)
    })
    api.getComponentsByType('photo').then((result) => {
      console.log(result.data)
      setPhotos(result.data)
    })

    setDesignerDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const updateComponent = (num) => {
    if(editType == "frame"){
      if(frameIndex + num < 0){
        setFrameIndex(frames.length - 1)
      } else {
        setFrameIndex((frameIndex + num)%frames.length)
      }
    }else {
      if(photoIndex + num < 0){
        setPhotoIndex(photos.length - 1)
      } else {
        setPhotoIndex((photoIndex + num)%photos.length)
      }
    }
  }

  const setX = (x) => {
    setPhotoPosition([photoPosition[0] + x, photoPosition[1]])
  }

  const setY = (y) => {
    setPhotoPosition([photoPosition[0], photoPosition[1] + y])
  }

  const chooseFile = () => {
   inputFile.current.click();
  };

  const updateFile = (event) => {
    const file = event.target.files[0];
    api.uploadComponent(file, "user-generated", "user").then((result) => {
      console.log(result.data)
      setPhotos([...photos, result.data])
    })
  }

  return(
    <div>
      <h4>Design Your Stuff!</h4>
      <div className="editTypeSelector">
        <ToggleButtonGroup type="radio" value={editType} name="editType" onChange={(val) => setEditType(val)}>
          <ToggleButton id="tbg-btn-1" value={"frame"} variant="outline-primary" className="border-2">
            Select Frame
          </ToggleButton>
          <ToggleButton id="tbg-btn-2" value={"photo"}variant="outline-primary" className="border-2">
             Select Photo
          </ToggleButton>
        </ToggleButtonGroup>
        <Button onClick={() => updateComponent(-1)} variant="outline-primary">
          <FontAwesomeIcon icon={faArrowLeft} />
          <FontAwesomeIcon icon={editType == "frame" ?  faVectorSquare : faPaw} />
        </Button>
        <Button onClick={() => updateComponent(1)} variant="outline-primary">
          <FontAwesomeIcon icon={editType == "frame" ?  faVectorSquare : faPaw} />
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
      <div className="subeditTypeSelector">
        { editType == "photo" && (
          <div>
            <Button onClick={() => setY(-5)} >
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
            <Button onClick={() => setY(5)} >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            <Button onClick={() => setX(-5)} >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <Button onClick={() => setX(5)} >
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
            <Button onClick={() => setPhotoScale(photoScale + 0.1)} >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button onClick={() => setPhotoScale(photoScale - 0.1)} >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
            <Button onClick={() => chooseFile()} >
              Upload
            </Button>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={(event) => updateFile(event)}/>
          </div>
        )}
      </div>
      <Button onClick={() => genImage()} >
        Generate
      </Button>
      <div className="designer" style={{position: 'relative', overflow: 'hidden'}}>
        <div 
          className="content" 
          style={{
            height: '100%',
            overflow: 'hidden',
            transformOrigin: 'top left',
            transform: 'scale('+designerScale+')', 
             
          }}
         >
          <img 
            src={photos[photoIndex].image_url} 
            style={{
              transformOrigin: 'top left',
              top: photoPosition[1]+"px", 
              left: photoPosition[0]+"px", 
              transform: 'scale('+photoScale+')', 
              position: 'absolute'
            }}
      />
          <img src={frames[frameIndex].image_url} style={{top: '0px', position: 'absolute'}}/>
        </div>
      </div>
    </div>
  )
}

export default StickerDesigner;
