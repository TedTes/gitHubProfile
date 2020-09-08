import React,{useState,useEffect} from 'react';
import colors from '../colors.js'
export default function Repos({repoData}){
   const LIMIT=10;
   const[rdata,setData]=useState({});
 useEffect(()=>{
      if(repoData){
         if(repoData.length!==undefined){
            const topRepos= repoData.filter(dta=>dta.language!==null)
            .sort((a,b)=>(b.stargazers_count-a.stargazers_count))
            .slice(0,LIMIT)
               setData(topRepos)
         }}
   },[repoData])

return rdata.length!==undefined &&<div className="repo-container">
   <h1>Top Repos:-</h1>
 {rdata.length&&rdata.map((dta,index)=>
 <a href={`${dta.html_url}`} className="repo-cards" key={index}>

          <span>{dta.name}</span>
          <span>{dta.description}</span>
          <div className="sub-repo">
          <span ><i style={{color:`${colors[dta.language].color}`,fontSize:".6em"}} className="fas fa-circle"></i>{dta.language}</span>
          <span><i className="far fa-star"></i>{dta.stargazers_count}</span>
          <span><i className="fas fa-code-branch"></i>{dta.forks}</span>
          <span>{dta.size}KB</span>
          </div>
          </a>
       )}
   </div>
   }


