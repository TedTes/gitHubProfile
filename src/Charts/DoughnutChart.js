import React,{useRef,useEffect,useState} from 'react';
import {Chart} from 'react-chartjs-2';
import colors from '../colors.js'



export default function DoughnutChart({repoData}){
  const donutRef=useRef(null);
  const[donutChart,setDonutChart]=useState({});

   useEffect(()=>{
    function getDonut(){
      if(repoData.length!==undefined){
        const staredRepos = repoData.filter(repo => !repo.fork && repo.stargazers_count > 0);
        const usedLangs = [...new Set(staredRepos.map(repo => repo.language))].filter(l=>l);
         const staredSumRes = usedLangs.map(lang => {
          const repos = staredRepos.filter(repo => repo.language === lang);
          const staredSum = repos.map(dta => dta.stargazers_count)
                           .reduce((accum,count)=>accum+count);
          
                return staredSum;
          })
          const canvObj=donutRef.current;
          const ctx=canvObj.getContext('2d');
          buildDonutChart(ctx,staredSumRes,usedLangs);
       }
     }
     getDonut();
   },[repoData])
   
   function buildDonutChart(ctx,staredSum,usedLangs){
     const clr=usedLangs.map(lang=>colors[lang].color)
  
    const data = {
      datasets: [{
          data: staredSum,
             backgroundColor:clr,
      }],
  
      labels: usedLangs
  };

    setDonutChart(new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        maintainAspectRatio: false ,
        legend:{
            position:'right',
             }
    }}));
  
   }
   
  return<div>
          <div className="chart-card">
          <canvas ref={donutRef} value={donutChart} id="donut-chart"  width="290" height="290"> </canvas> 
        </div>
      </div>
}
