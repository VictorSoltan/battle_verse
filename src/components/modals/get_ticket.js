import React from 'react' 
import '../../styles/modals/get_ticket.scss'
import Box from '../../assets/staking/modal/box.png'


export default function GetTicket({setGetTicket, setConfrts}){

  const probability = [
    {state: 'TRUE', value: '2000-3500', procent: '70%'},
    {state: 'RARE', value: '1000-2000', procent: '20%'},
    {state: 'EPIC', value: '500-1000', procent: '7%'},
    {state: 'LEGEND', value: '1-500', procent: '3%'}
  ]

  return(
    <div className="ticketContainer">
      <div className="getTicketBackground" onClick={() => setGetTicket(false)}/>
      <div className="getTicket">
        <h1>BOX #124</h1>
        <h4>NFT SROOM G1</h4>
        <img src={Box} alt="box" />
        <h6>DATE: 10 NOVEMBER 2021</h6>
        <p>OPEN IT AND YOU WILL RECEIVE AN NFT <span>SROOM G1</span> CHARACTER</p>
        <div className='info'>
          {probability.map((item, index) => {
            return(
              <div className='bar'>
                <h5>{item.state}</h5>
                <div>
                  <h5>{item.value}</h5>
                  <h5>{item.procent}</h5>
                </div>
              </div>
            )
          })}
        </div>
        <button onClick={() => (setGetTicket(false), setConfrts(true))}>OPEN BOX</button>
      </div>
    </div>
  )
}