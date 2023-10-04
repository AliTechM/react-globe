import React ,{ useState, useEffect } from 'react';
import fileData from './earth/infos.json'
import {useParams ,} from "react-router-dom";

export default function Details() {
 
  const [summary, setSummary] = useState([]);
  const [preDtata,setPreData]=useState([]);
  const [loading, setLoading] = useState(true);
  const params= useParams();
  
   useEffect(()=>{
   
     if(params.navid === 'undefined'){
      const paramVal= localStorage.getItem('paramValue');
      const simpleData=fileData[paramVal];
      setPreData(Object.entries(simpleData).filter(([key]) => key !== 'text' && key !== 'id'&&  key !== 'type'));
      setLoading(true);
      callApi(paramVal)
     }
     else{
     
      const paramVal=params.navid;
      localStorage.setItem('paramValue',paramVal);
      const simpleData=fileData[paramVal];
      setPreData(Object.entries(simpleData).filter(([key]) => key !== 'text' && key !== 'id'&&  key !== 'type'));
      setLoading(true);
      callApi(paramVal)
     }
      
    
  },[params.navid]);  
    async function  callApi ( qu){
      // Fetch Wikipedia data based on the label's text       
      try {
          const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${qu}`);
          if (!response.ok) {
            throw new Error('Bad Network response');          }
          const data = await response.json();          
          setSummary(data.extract);                 
          // details content with the Wikipedia summary
          
        } catch (error) {
          console.error('Error fetching Wikipedia data:', error);
          setSummary('Error fetching data. Please try again later.');
        }
       setLoading(false);
      };
    return (
      <>    
        <div className="container" >        
        <h3>{localStorage.getItem('paramValue')}</h3>
           {preDtata.map(([key,val])=>(
           <div className="item" key={key}>
           <div className="key">{key}</div>
           <div className="value">{val}</div>
           </div>
        ))}      
        {loading?  <div id='search-spinner'></div> :
      <p> {summary}</p> }         
      </div>    
      </>
    )
  }