import React ,{useRef} from 'react';
import { useHistory} from 'react-router-dom';
import './app.css';

export default function Home() {
  const history=useHistory();
  const inputRef=useRef(null);
  const handleClick=()=>{
   history.push(`/profile/${inputRef.current.value}`)
    }
  return (
      <div className="">
       <div> <input  type="text" ref={inputRef}/>
      <button onClick={handleClick}>Find</button></div>
    </div>
 );
}
