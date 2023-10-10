import React, { useState } from 'react'

function JoinGames() {
  const [rivalUsername, setRivalUsername] = useState('');
  return (
    <div className='joinGame'>
      <h4>Create Game</h4>
      <input 
         placeholder='Username of rival' 
         onChange={(e) => {
            setRivalUsername(e.target.value);
         }} />
         <button>Join/Start Game</button>
    </div>
  )
}

export default JoinGames