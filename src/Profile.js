import React ,{useState,useEffect} from 'react';
import './styles/style.css';
import Header from './Header.js';
import ChartsData from './Charts/ChartsData.js';
import Repos from './Charts/Repos.js';
import axios from 'axios';
import {useRouteMatch} from 'react-router-dom';

function Profile(){
  const[data,setData]=useState();
  const[loading,setLoading]=useState(false);
  const match=useRouteMatch();
  const access_token="59b554618fcf4e17443291e1cfa8f0020d44df1b";
useEffect(()=>{
 axios.get(`https://api.github.com/users/${match.params.name}`,
{
  headers:{'Authorization':`token${access_token}`}
} )
 .then(response=>{
   if(response.data.public_repos!==0){
    setData(response.data)
    setLoading(true);
   }

  })
},[match.params.name])
 return (
data? (<div>
   {data && <Header data={data}/>}
    {data && <ChartsData data={data}/>}
     {data && <Repos  data={data}/> }
     {<div className="footer"><a href="https://github.com/TedTes/gitHubProfile">Github Repo @TedTes</a></div>}
    </div>):(<div className="no-repo"><h4 >No Repos Yet</h4></div>)

     );
    }
    
export default Profile;