import React ,{useState,useEffect} from 'react';
import './app.css';
import Header from './Header.js';
import ChartsData from './ChartsData.js';
import Repos from './Repos.js';
import axios from 'axios';
import {useRouteMatch} from 'react-router-dom';

function Profile(){
  const[data,setData]=useState({});
  const match=useRouteMatch();
  const access_token="59b554618fcf4e17443291e1cfa8f0020d44df1b";
useEffect(()=>{
 axios.get(`https://api.github.com/users/${match.params.name}`,
{
  headers:{'Authorization':`token${access_token}`}
} )
 .then(response=>setData(response.data))
},[match.params.name])
 return (
 <div className="app">
    <Header data={data}/>
    <ChartsData data={data}/>
    <Repos  data={data}/>
   </div>
     );
    }
    
export default Profile;