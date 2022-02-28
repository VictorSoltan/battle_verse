import React from 'react'
import '../../styles/modals/stop_staking.scss'

export default function StopStaking(props){
  return(
    <div className="stopStakingContainer">
      <div className="botBackground"/>
      <div className="stopStaking">
        <h1>OOPS. STOP STAKING?</h1>
        <p>IF YOU STOP, THEN YOUR NFT WILL MOVE TO YOUR COLLECTION</p>
        <div>
          <button onClick={() => props.setStopStaking(false)}>STOP STAKING</button>
          <button onClick={() => {props.setStopStaking(false), props.setAddBotStaking(true)}}>PROCEED</button>
        </div>
      </div>      
    </div>
  )
}