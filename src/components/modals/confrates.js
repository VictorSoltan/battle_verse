import React from 'react' 
import '../../styles/modals/confrates.scss'
import Shroom from '../../assets/staking/modal/shroom.png'


export default function Confrates({setConfrts}){

  const probability = [
    {state: 'TRUE', value: '2000-3500', procent: '70%'},
    {state: 'RARE', value: '1000-2000', procent: '20%'},
    {state: 'EPIC', value: '500-1000', procent: '7%'},
    {state: 'LEGEND', value: '1-500', procent: '3%'}
  ]

  return(
    <div className="confratesContainer">
      <div className="getTicketBackground" onClick={() => setConfrts(false)}/>
      <div className="getTicket">
        <h1>CONFRATES!</h1>
        <img src={Shroom} alt="shroom" />
        <h4>#2343 G1</h4>
        <button onClick={() => setConfrts(false)}>GET</button>
      </div>
    </div>
  )
}