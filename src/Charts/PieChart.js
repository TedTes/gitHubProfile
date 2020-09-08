
import React,{useRef,useEffect,useState} from 'react';
import {Chart} from 'react-chartjs-2';
import { EndOfLineState } from 'typescript';


export default function PieChart({languages}){
    const pieCanvasRef=useRef(null);
    const [pieChart,setPieChart]=useState({})
    const [isEmpty,setEmpty]=useState(false)

    useEffect(()=>{
        let languageLabels,languageValues,languageColors;
        if(languages.length!==undefined){
        languageLabels= languages.map(dta=>dta.label);
        languageValues=languages.map(dta=>dta.value);
        languageColors=languages.map(dta=>dta.color);
         }
       const canvObj=pieCanvasRef.current;
       const ctx=canvObj.getContext('2d');
      drawPieChart(ctx,languageValues,languageLabels,languageColors);
   },[languages])


    function drawPieChart(ctx,languageValues,languageLabels,languageColors){
        let data={
            datasets:[{
                data:languageValues,
                backgroundColor:languageColors,
                borderAlign:"inner",
                borderWidth:"50px",
            }],
            labels:languageLabels
        }
        if(languageValues!==undefined){
            languageValues.length!==0?
            setPieChart(new Chart(ctx, {
                type: 'pie',
                data: data,
                responsive:true,
                options: {
                    maintainAspectRatio: false ,
                    legend:{
                        position:'left',
                        align:'start'
                    }
                  }
            
            })
           ):setEmpty(true)
        }
    
    }
      return<div className="chart-card">
            <h3>Top Languages</h3>
            <div>
           {!isEmpty?<canvas id="pie-chart"  ref={pieCanvasRef}  value={pieChart} />:<span className="no-chart-data">Oops No Languages!</span>}
            </div>
        
        </div>
}