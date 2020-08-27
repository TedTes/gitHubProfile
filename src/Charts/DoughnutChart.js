import React,{useRef,useEffect,useState} from 'react';
import {Chart} from 'react-chartjs-2';


export default function DoughnutChart({repoData}){
  const ref=useRef(null);
    const donutRef=ref.current;
   const ctx=donutRef.getContext('2d');
   useEffect(()=>{
    function getDonut(){
      if(repoData.length!==undefined){
        const staredRepos = repoData.filter(repo => !repo.fork && repo.stargazers_count > 0);
        const usedLangs = [...new Set(staredRepos.map(repo => repo.language))].filter(l=>l);
         const data = usedLangs.map(lang => {
          const repos = staredRepos.filter(repo => repo.language === lang);
          const staredSum = repos.map(dta => dta.stargazers_count)
                           .reduce((accum,count)=>accum+count);
          
          return staredSum;
          })
          console.log(data);
          console.log(usedLangs);
       }
     }
     getDonut();
   })
 
  
   

    
    return<div>
          <div className="donutChart">
          <canvas ref={donutRef} id="donut-chart" className="donut-chart" width="190" height="190" />
        </div>
         </div>
}
