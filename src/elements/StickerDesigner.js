import api from '../api'
import thumper from '../assets/thumper-transparent.gif';
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faArrowUp, faArrowDown, faPaw, faVectorSquare, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return [ width, height ]
}

const StickerDesigner = ({loadProducts, socketId}) => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [designerScale, setDesignerScale] = useState(1);
  const [designerLength, setDesignerLength] = useState(1000);
  const [frames, setFrames] = useState([{image_url: ""}])
  const [frameIndex, setFrameIndex] = useState(0)
  const [photos, setPhotos] = useState([{image_url: thumper}])
  const [photoIndex, setPhotoIndex] = useState(0)
  const [editType, setEditType] = useState("frame")
  const [photoPosition, setPhotoPosition] = useState([0, 200])
  const [photoScale, setPhotoScale] = useState(1)
  const inputFile = useRef(null) 
  //TODO: find frame size dynamically in future
  const frameSize = 1000

  const genImage = () => {
    loadProducts()
    api.createComposite(
      photos[photoIndex],
      frames[frameIndex],
      photoScale,
      photoPosition,
      socketId
    )
   }

  const setDesignerDimensions = (dimensions) => {
    let size = 0;
    if(dimensions[0] < 768){
      size = dimensions[0] - 20
    }else{
      size = Math.min(dimensions[0] - 300, 850)
    }
    setDesignerScale(size/frameSize);
    setDesignerLength(size)
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
      setPhotos(result.data)
    })

    setDesignerDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPhotoDefaults(photoIndex)
  }, [photoIndex, photos])


  const setPhotoDefaults = (index) => {
      const x_scale = photos[index].width/frameSize
      const y_scale = photos[index].height/frameSize
      console.log(x_scale, y_scale)
      setPhotoScale(1/Math.min(x_scale, y_scale))

      const new_width =  photos[index].width/x_scale
      const new_height =  photos[index].height/y_scale
      const x_offset = (new_width - frameSize)/2
      const y_offset = (new_height - frameSize)/2
      setPhotoPosition([x_offset, y_offset])
  }

  const updateComponent = (num) => {
    let newPhotoIndex = photoIndex;
    if(editType == "frame"){
      if(frameIndex + num < 0){
        setFrameIndex(frames.length - 1)
      } else {
        setFrameIndex((frameIndex + num)%frames.length)
      }
    }else {
      if(photoIndex + num < 0){
        newPhotoIndex = photos.length - 1
      } else {
        newPhotoIndex = (photoIndex + num)%photos.length
      }
      setPhotoIndex(newPhotoIndex)
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
    console.log("about to upload")
    api.uploadComponent(file, undefined, "user-generated", "user").then((result) => {
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
            Change Frame
          </ToggleButton>
          <ToggleButton id="tbg-btn-2" value={"photo"}variant="outline-primary" className="border-2">
             Change Photo
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
            <Button onClick={() => setPhotoScale(photoScale + photoScale/100)} >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button onClick={() => setPhotoScale(photoScale - photoScale/100)} >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
            <Button onClick={() => chooseFile()} >
              Upload
            </Button>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={(event) => updateFile(event)}/>
          </div>
        )}
      </div>
      <div className="designer" 
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: designerLength,
          height: designerLength
        }}
      >
        <div 
          className="content" 
          style={{
            overflow: 'hidden',
            width: frameSize+'px',
            height: frameSize+'px',
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
      <Button onClick={() => genImage()} >
        Preview on Stuff
      </Button>
    </div>
  )
}

export default StickerDesigner;
