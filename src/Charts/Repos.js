import React,{useState,useEffect} from 'react';
export default function Repos({repoData}){
   const LIMIT=10;
   const[rdata,setData]=useState({});
 useEffect(()=>{
      if(repoData){
         if(repoData.length!==undefined){
            const topRepos= repoData
            .sort((a,b)=>(b.stargazers_count-a.stargazers_count))
            .slice(0,LIMIT)
               setData(topRepos)
         }
    
     
           }
      
   },[repoData])

return<div className="repo-container">
        <h3 style={{color:"black"}}> Top Repos</h3>
        {rdata.length&&rdata.map((dta,index)=>
        <div className="card" key={index}>
           <span>{dta.name}</span>
           <span>{dta.size}</span>
           <span>{dta.description}</span>
           <span>{dta.language}</span>
           <span>{dta.stargazers_count}</span>
           <span>{dta.forks}</span>
        </div>
        )}
 </div>
   }


