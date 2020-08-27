import React,{useEffect,useState} from 'react';
import {useRouteMatch} from 'react-router-dom';
import GhPolyglot from 'gh-polyglot';
import  PieChart from './Charts/PieChart.js'
import DoughnutChart from './Charts/DoughnutChart.js'
import BarChart from './Charts/BarChart.js'
import Axios from 'axios';

export default function ChartsData({data}){
    const[languages,setLanguages]=useState({});
    const[repoData,setRepoData]=useState({});
    const match=useRouteMatch();
    const username=match.params.name;
    const access_token="59b554618fcf4e17443291e1cfa8f0020d44df1b";
    const me=new GhPolyglot(username,`${access_token}`);
   
 function getGitLanguages(){
     if(username){
       me.userStats((err,stat)=>{
            // console.log(err||stat);
            if(stat)setLanguages(stat);
        })  
    }}
 function getGitRepoStats(){
   Axios.get(`${data.repos_url}?per_page=100`,{
       headers:{'Authorization':`token${access_token}`}
   })
   .then(res=>{
     const data=res.data;
    const result = data.map(dta=>dta.language);
    console.log(result);
    //  console.log("from server")
    //  console.log(res.data.map(dta=>dta.language));
     setRepoData(res.data)
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
return <div className="chart-data">
  <PieChart languages={languages}/>
  <BarChart repoData={repoData}/>
  <DoughnutChart repoData={repoData}/>
</div>
}

