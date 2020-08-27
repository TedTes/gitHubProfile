import React from 'react';
export default function Header({data}){

    const{name,login,followers,following,public_repos,location,company,avatar_url,created_at}=data
    return<div className="header">
       <div className="profile-bio">
         <img src={avatar_url} alt=""/>
         <div><h1>{name}</h1></div>
         <div><h3>@{login}</h3></div>
       <div>
        <h4>{followers}</h4>
        <h4>{following}</h4>
        <h4>{public_repos}</h4>
        </div>
        <div>
        <h4>{location}</h4>
        <h4>{company}</h4>
        <h4>{created_at}</h4>
        </div>
        </div>
    </div>
}