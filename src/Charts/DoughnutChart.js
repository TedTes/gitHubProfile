import React,{useRef,useEffect,useState} from 'react';
import {Chart} from 'react-chartjs-2';
import colors from '../colors.js'



export default function DoughnutChart({repoData}){
  const donutRef=useRef(null);
  const[donutChart,setDonutChart]=useState({});
  const[isEmpty,setEmpty]=useState(false)

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
   staredSum.length!==0?
    setDonutChart(new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        maintainAspectRatio: false ,
        legend:{
            position:'left',
            align:'start'
           
           }
    }})):setEmpty(true);
  
   }
   
  return<div className="chart-card">
    <h3>Stars per Language</h3>
 
    <div>
  {!isEmpty? <canvas ref={donutRef} value={donutChart} id="donut-chart" > </canvas>:<span className="no-chart-data">Oops No Stared Language!</span> }
     </div>
        </div>
}
