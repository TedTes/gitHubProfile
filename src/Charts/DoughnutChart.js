import React,{useRef,useEffect,useState} from 'react';
import {Chart} from 'react-chartjs-2';


export default function DoughnutChart({repoData}){
  console.log("from dont")
  console.log(repoData)
  const[donutChart,setDonutChart]=useState({});
  const donutRef=useRef(null);
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
    const data = {
      datasets: [{
          data: usedLangs
      }],
  
      labels: staredSum
  };

    setDonutChart(new Chart(ctx, {
      type: 'doughnut',
      data: data,
      // options: options
  }));
  
   }
   
  return<div>
          <div className="donutChart">
          <canvas ref={donutRef} value={donutChart} id="donut-chart" className="donut-chart" width="190" height="190" />
        </div>
      </div>
}
