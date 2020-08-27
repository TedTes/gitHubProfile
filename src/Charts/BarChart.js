import React,{useRef,useState,useEffect} from 'react';
import {Chart} from 'react-chartjs-2';

export default function BarChart({repoData}){
     const barCanvasRef=useRef(null)
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
    // console.log("from draw")
    // console.log(topStaredRepo);
   let staredRepo= topStaredRepo.map(dta=>dta.stargazers_count)
   let labels=topStaredRepo.map(dta=>dta.name)
 
    let data={
        labels,
        datasets: [{
            label:'first dataset',
            categoryPercentage: 0.3,
            barPercentage: .9,
            // barCategoryGap:300,
            barThickness: 30,
            data: staredRepo
        }],
       
    };
    let options={
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              tooltips:{
                  cornerRadius:3
              }
    }

setBarChart(new Chart(ctx, {
    type: 'bar',
    data: data,
    options:options
}));
}
    
return<div className="bar-chart">
        <canvas id="bar-chart" ref={barCanvasRef} value={barChart} width="290" height="100"></canvas>
    </div>
}