import React from 'react' 
import '../../styles/modals/add_bot_staking.scss'

import Coin from '../../assets/qzq_coin.png'
import Energy from '../../assets/header/icon_energy.svg'

export default function addBotStaking(props){
  return(
    <div className="addBotStakingContainer">
      <div className="botBackground" onClick={() => (props.setAddBotStaking(false), props.setStopStaking(true))} />
      <div className="addBot">
        <div className="closeModal" dangerouslySetInnerHTML={{ __html: '&#x2715' }} onClick={() => (props.setAddBotStaking(false), props.setStopStaking(true))}/>
        <h1>ADD BOT ON STAKING</h1>
        <div className="infoContainer">
          <div>
            <div className="earnings_qzq">
              <header>
                <img src={Coin} alt="coin" />
                <h4>EARNINGS <span>QZQ</span></h4>
              </header>
              <div>
                <h5>TRUE</h5>
                <h5>EPIC</h5>
                <h5>RARE</h5>
                <h5>LEGEND</h5>
              </div>
              <div>
                <h5>PER DAY</h5>
                <h5>0,17</h5>
                <h5>0,24</h5>
                <h5>0,31</h5>
                <h5>0,40</h5>
              </div>
              <div>
                <h5>PER MONTH</h5>
                <h5>62,50</h5>
                <h5>87,50</h5>
                <h5>112,50</h5>
                <h5>145,40</h5>
              </div>
              <div>
                <h5>PER YEAR</h5>
                <h5>750,50</h5>
                <h5>1050,50</h5>
                <h5>1350,50</h5>
                <h5>1755,40</h5>
              </div>
            </div>
            <div className="earnings_energy">
              <header>
                <img src={Energy} alt="coin" />
                <h4>EARNINGS <span>ENERGY</span></h4>
              </header>
              <div>
                <h5>TRUE</h5>
                <h5>EPIC</h5>
                <h5>RARE</h5>
                <h5>LEGEND</h5>
              </div>
              <div>
                <h5>PER DAY</h5>
                <h5>0,17</h5>
                <h5>0,24</h5>
                <h5>0,31</h5>
                <h5>0,40</h5>
              </div>
              <div>
                <h5>PER MONTH</h5>
                <h5>62,50</h5>
                <h5>87,50</h5>
                <h5>112,50</h5>
                <h5>145,40</h5>
              </div>
              <div>
                <h5>PER YEAR</h5>
                <h5>750,50</h5>
                <h5>1050,50</h5>
                <h5>1350,50</h5>
                <h5>1755,40</h5>
              </div>
            </div>
          </div>
          <div className="nftGroup">
            <header>
              <h4>NFT GROUP</h4>
              <span>STARTING DEPOSIT BONUS</span>
            </header>
            <div>
              <img src={Coin} alt="coin" />
              <img src={Energy} alt="energy" />
            </div>
            <div>
              <h5>1 NFT</h5>
              <h5>180</h5>
              <h5>30</h5>
            </div>
            <div>
              <h5>2 NFT</h5>
              <h5>500</h5>
              <h5>80</h5>
            </div>
            <div>
              <h5>3 NFT</h5>
              <h5>900</h5>
              <h5>170</h5>
            </div>
            <div>
              <h5>1+2 NFT<span>*</span></h5>
              <h5>1080</h5>
              <h5>200</h5>
            </div>
            <div>
              <h5>2+2 NFT<span>*</span></h5>
              <h5>1400</h5>
              <h5>250</h5>              
            </div>
            <h4>FURTHER</h4>
            <div>
              <h5>+1 NFT</h5>
              <h5>+180</h5>
              <h5>+30</h5>              
            </div>
            <h5><span>*</span>BOTS+SHROOMS</h5>
          </div>
        </div>
        <button onClick={() => props.setAddBotStaking(false)} >OK</button>
      </div>
    </div>
  )
} 