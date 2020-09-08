import React,{useRef,useState,useEffect} from 'react';
import {Chart} from 'react-chartjs-2';
import colorsObj from '../colors.js'
export default function BarChart({repoData}){
     const barCanvasRef=useRef(null)
     const [isEmpty,setEmpty]=useState(false);
     const[barChart,setBarChart]=useState();
     const LIMIT=5;
    useEffect(()=>{
       const barObj=barCanvasRef.current;
       const ctx=barObj.getContext('2d')
       //sort repo
       if(repoData.length!==undefined){
        let topStaredRepo= repoData
        .sort((a,b)=>(b.stargazers_count-a.stargazers_count))
        .slice(0,LIMIT)
         drawBarChart(ctx,topStaredRepo)
       }
  
 },[repoData])

function drawBarChart(ctx,topStaredRepo){
  const colorObj=Object.values(colorsObj)
  const colors=colorObj.map(obj=>obj.color)
                 .filter(color=>color)
                .sort(()=>(Math.random() - Math.random()))
                .slice(0, LIMIT);

   let staredRepo= topStaredRepo.map(dta=>dta.stargazers_count)
   let labels=topStaredRepo.map(dta=>dta.name)
    let data={
        labels,
        datasets: [{
            backgroundColor:colors,
            barThickness: 30,
            data: staredRepo
        }],
       
    };
    let options={
            maintainAspectRatio: false,
            legend:{
              display:false
            },
            scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              tooltips:{
                  // cornerRadius:3
              }
    }
    staredRepo.reduce((sum,val)=>sum+val)!==0?
setBarChart(new Chart(ctx, {
    type: 'bar',
    data: data,
    options:options
})):setEmpty(true)
}
    
return<div className="chart-card">
      <h3>Most Starred</h3>
      <div>
    { !isEmpty?<canvas id="bar-chart" ref={barCanvasRef} value={barChart}></canvas>:<span className="no-chart-data">Oops No Stared Repos!</span>} 
     </div>
       </div>
}