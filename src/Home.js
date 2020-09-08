import React ,{useRef} from 'react';
import { useHistory} from 'react-router-dom';
// import './app.css';

export default function Home() {
  const history=useHistory();
  const inputRef=useRef(null);
  const handlePress=(e)=>{
    if(e.key==="Enter")
   history.push(`/profile/${inputRef.current.value}`)
    }
  return (
      <div className="home">
        <div className="home-main" >
        <i  className="fab fa-4x fa-github"></i>
      <input   onKeyPress={handlePress} type="text" ref={inputRef} placeholder="Enter github name"/>
      </div>
    </div>
 );
}
