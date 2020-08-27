import React,{useRef,useEffect,useState} from 'react';
import {Chart} from 'react-chartjs-2';


export default function PieChart({languages}){
    console.log(languages);
    const pieCanvasRef=useRef(null);
    const [pieChart,setPieChart]=useState({})

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
       setPieChart(new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                maintainAspectRatio: false ,
                legend:{
                    position:'right',
                     }
              }
        
        })
       ); 
    }
      return<div>
          <div className="pieChart">
          <canvas id="pie-chart" className="pie-chart" ref={pieCanvasRef}  value={pieChart} width="190" height="190" />
        </div>
         </div>
}
