import React, { useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import immmg from '../../assets/textures/combined.jpg'
import img1 from "../../assets/textures/1.jpg"
import img2 from "../../assets/textures/2.png"
import img3 from "../../assets/textures/night-sky.png"
import { Link } from "react-router-dom";
import infos from './infos.json'
import { useIdContext } from '../IdContext';

const GlobeComponent = () => {
  const globeRef = useRef(null);
  const { updateTargetName, } = useIdContext();

  const handlelinkClick = () => {
    updateTargetName(popupContent1.text);

  };
  // get data from JSON and use it in Globe 
  const mapData = [];
  for (const continentName in infos) {
    if (infos.hasOwnProperty(continentName)) {
      const continentData = infos[continentName];
      mapData.push(continentData);
    }
  }
  const [popupContent1, setPopupContent1] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  // async function after the label is clicked
  const handleLabelClickAsync = async (label) => {
    console.log(label);
    const newCameraPosition = [label.lat, label.lng, 3.3];
    await new Promise((resolve) => {
      globeRef.current.pointOfView({ lat: newCameraPosition[0], lng: newCameraPosition[1], altitude: newCameraPosition[2] }, [900]);
      setTimeout(resolve, 900);
    });
    await new Promise((resolve) => {
      globeRef.current.pointOfView({ lat: newCameraPosition[0], lng: newCameraPosition[1], altitude: 1 }, [900]);
      setTimeout(resolve, 900);
    });
    setPopupContent1(label);
    handleOpenPopup();
  }

  const getNumbers = (str) => {
    const numbers = str.match(/\d+/g);
    const combinedNumber = numbers ? Number(numbers.join('')) : null;
    const intValue = Math.floor(combinedNumber);
    const result = (intValue * 0.5) / 165;
    return result < 1 ? result + 1 : result;
  }

  return <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
    <Globe
      ref={globeRef}
      globeImageUrl={img1}
      bumpImageUrl={img2}
      backgroundImageUrl={img3}
      labelsData={mapData}
      labelIncludeDot={true}
      // labelDotRadius={(d => getNumbers(d.Area))}
      labelDotRadius={0.8}
      labelColor={() => '#FFFFFF'}
      labelResolution={7}
      animateIn={true}
      onLabelClick={handleLabelClickAsync}
      labelSize={1.3}
      autoRotate={true}
      autoRotateSpeed={2}

    />
    {popupContent1 && (
      <div className={isOpen ? "popupdrop" : ""} onClick={handleClosePopup}>
        <div className={isOpen ? 'popup' : "popup close-popup"} >
          <h2>{popupContent1.text}</h2>
          {popupContent1.type ? (
            <>
              <table>
                <thead>
                </thead>
                <colgroup>
                  <col style={{ backgroundColor: "#f1f1f1" }}></col>
                  <col style={{ backgroundColor: "white" }}></col>
                </colgroup>
                <tbody>
                  <tr>
                    <td>Area:</td>
                    <td>{popupContent1.Area}</td>
                  </tr>
                  <tr>
                    <td>Max length:</td>
                    <td>{popupContent1.MaxLength}</td>

                  </tr>
                  <tr>
                    <td>Max width:</td>
                    <td>{popupContent1.MaxWidth}</td>
                  </tr>
                </tbody>
                <tfoot></tfoot>
              </table>
            </>
          ) : (
            <>
              <table>
                <thead>
                </thead>
                <colgroup>
                  <col style={{ backgroundColor: "#f1f1f1" }}></col>
                  <col style={{ backgroundColor: "white" }}></col>
                </colgroup>
                <tbody>
                  <tr>
                    <td>Population:</td>
                    <td>{popupContent1.Population} </td>
                  </tr>
                  <tr>
                    <td>Area:</td>
                    <td>{popupContent1.Area} </td>
                  </tr>
                  <tr>
                    <td>PopulationDensity:</td>
                    <td>{popupContent1.PopulationDensity} </td>
                  </tr>
                  <tr>
                    <td>GDP:</td>
                    <td>{popupContent1.GDP} </td>
                  </tr>
                </tbody>
                <tfoot>
                </tfoot>
              </table>
            </>
          )}
          <div className='buttonContainer'>
            <button className='dialogLink' onClick={handleClosePopup}>Cancel</button>
            <Link to={`/react-globe/main`} onClick={() => handlelinkClick()} className='dialogLink primary'> more </Link>
          </div>
        </div>
      </div>
    )}
  </div>
};
export default GlobeComponent;
