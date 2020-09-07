import React from 'react';
export default function Header({data}){

    const{name,login,followers,following,public_repos,location,company,avatar_url,created_at}=data
    return<div className="header">
       <div className="profile">
         <img src={avatar_url} alt=""/>
         <div><h1>{name}</h1></div>
         <div><h3><a href={`https://github.com/${login}`}>@{login}</a></h3></div>
       <div className="bio-status">
        <h4><span>Followers</span>{followers}</h4>
        <h4><span>Following</span>{following}</h4>
        <h4><span>Repos</span>{public_repos}</h4>
        </div>
        <ul>
          <li><span><i className="far fa-compass"></i></span>{location} </li>
          <li><span><i className="far fa-building"></i></span>{company}</li>
          <li><span><i className="far fa-calendar-alt"></i></span> {created_at}</li>
        
        </ul>
        </div>
    </div>
}