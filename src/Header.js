import React from 'react';
export default function Header({data}){

    const{name,login,followers,following,public_repos,location,company,avatar_url,created_at}=data
    return<div className="header">
       <div className="profile">
         <img src={avatar_url} alt=""/>
         <div><h1>{name}</h1></div>
         <div><h3><a href="/">@{login}</a></h3></div>
       <div className="bio-status">
        <h4><span>Followers</span>{followers}</h4>
        <h4><span>Following</span>{following}</h4>
        <h4><span>Repos</span>{public_repos}</h4>
        </div>
        <div className="company">
        <span>{location}</span>
        <span><i class="far fa-building"></i>{company}</span>
        <span>{created_at}</span>
        </div>
        </div>
    </div>
}