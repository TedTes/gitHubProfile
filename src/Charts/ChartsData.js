import React,{useEffect,useState} from 'react';
import {useRouteMatch} from 'react-router-dom';
import GhPolyglot from 'gh-polyglot';
import  PieChart from './PieChart.js'
import DoughnutChart from './DoughnutChart.js'
import BarChart from './BarChart.js'
import Axios from 'axios';
import Repos from './Repos'

export default function ChartsData({data}){

    const[languages,setLanguages]=useState({});
    const[repoData,setRepoData]=useState({});
    
    const match=useRouteMatch();
    const username=match.params.name;
    
    const access_token="59b554618fcf4e17443291e1cfa8f0020d44df1b";
    const me=new GhPolyglot(username);
   
 function getGitLanguages(){
     if(username){
          me.userStats((err,stat)=>{
          if(stat)setLanguages(stat);
        })  
    }
  }
 function getGitRepoStats(){
 
//  Axios.get(`https://api.github.com/rate_limit`).then(res=>console.log(res))
   Axios.get(`${data.repos_url}?per_page=100`,{
       headers:{'Authorization':`token${access_token}`}
   })
   .then(res=>{
     setRepoData(res.data);
   
    })
 }

useEffect(()=>{
    async function fetchData(){
    try{
        if(data.repos_url){
          getGitLanguages()
          getGitRepoStats()
        }
          }
    catch(e){
    console.log(e);
         }

}
 fetchData();
 
},[data.repos_url])
return <div >
 <div className="chart-data">
 { languages && <PieChart languages={languages}/>} 
 {repoData && <BarChart repoData={repoData}/>} 
 {repoData && <DoughnutChart repoData={repoData}/>} 
 </div>
{repoData && <Repos repoData={repoData}/>}
</div>
}

