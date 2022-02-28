import React, {useState, useEffect} from 'react' 
import '../styles/staking.scss'
import GetTicket from './modals/get_ticket'
import Confrates from './modals/confrates'
import AddBot from './modals/add_bot'
import AddBotStaking from './modals/add_bot_staking'
import StopStaking from './modals/stop_staking'

import Particles from '../assets/staking/particles.png'

import Union from '../assets/staking/union.svg'

import Coupon1 from '../assets/staking/coupon1.png'
import Coupon2 from '../assets/staking/coupon2.png'
import Coupon3 from '../assets/staking/coupon3.png'

import Coupon from '../assets/staking/coupon.png'
import Coupon_day_2 from '../assets/staking/coupon_day_2.png'
import Coupon_day_3 from '../assets/staking/coupon_day_3.png'
import Coupon_day_4 from '../assets/staking/coupon_day_4.png'
import Coupon_day_5 from '../assets/staking/coupon_day_5.png'
import Coupon_day_6 from '../assets/staking/coupon_day_6.png'

import Case_mini from '../assets/staking/case_mini.png'

import Check from '../assets/staking/check.svg'

import Plus from '../assets/staking/plus.png'

import Character from '../assets/character.png'
import Time from '../assets/time.svg'
import Coin from '../assets/qzq_coin.png'
import Energy from '../assets/header/icon_energy.svg'
import Stop from '../assets/stop.svg'

import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';

export default function Earnings(props){

  let [getTicket, setGetTicket] = useState(false)
  let [confrts, setConfrts] = useState(false)  
  let [addBot, setAddBot] = useState(false)
  let [addBotStaking, setAddBotStaking] = useState(false)
  let [stopStaking, setStopStaking] = useState(false)
  let [num, setNum] = useState(12345)

  let [characterArr, setCharacterArr] = useState([
    {status: 'LEGEND', select: 0},
    {status: 'TRUE', select: 0},
    {status: 'TRUE', select: 0},
    {status: 'LEGEND', select: 0}
  ])

  function setStyleNum(ind, num){
    let newArr = [...characterArr]
    newArr[ind].select = num
    setCharacterArr(newArr)
  }

  useEffect(() => {
    if(addBot||addBotStaking||stopStaking){
      document.querySelector('body').style.overflow = 'hidden'
      document.querySelector('html').style.overflow = 'hidden'
      container = document.querySelector('.characterContainer').style.overflow = 'hidden'
    }else{
      document.querySelector('body').style.overflow = 'auto'
      container = document.querySelector('.characterContainer').style.overflow = 'auto'
    }
  }, [addBot,addBotStaking,stopStaking])

  if(num===12345){
    setTimeout(function() { setNum(23456) }, 1000);
  }

  const coupons = [
    {icon: Coupon, title: '1 DAY', value: '3000', received: true, get: false},
    {icon: Coupon_day_2, title: '2 DAY', value: '3500', received: false, get: true},
    {icon: Coupon_day_3, title: '3 DAY', value: '4000', received: false, get: false},
    {icon: Coupon_day_4, title: '4 DAY', value: '4500', received: false, get: false},
    {icon: Coupon_day_5, title: '5 DAY', value: '5000', received: false, get: false},
    {icon: Coupon_day_6, title: '6 DAY', value: '5500', received: false, get: false}]
    
  let container
  
  function addContainer(){
    if(document.querySelector('.characterContainer')){
      container = document.querySelector('.characterContainer')
    }
  }

  let isDown = false;
  let startX;
  let scrollLeft;
  
  function makeSliderActive(e) {
    addContainer()
    isDown = true;
    container.classList.add('active');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  }
  function removeSliderActive() {
    addContainer()
    isDown = false;
    container.classList.remove('active');
  }

  function containerSlide(e) {
    addContainer()
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    container.scrollLeft = scrollLeft - walk;
  }

  return(
    <div className="earnings">
      <div className='dailyTicketsContainer'>
        <div className="dailyTickets" style={{backgroundImage: `url(${Particles})`}}>
          <div className="dailyCardsContainer">
            <header>
              <h1>DAILY TICKETS</h1>
              <Odometer value={num} duration={ 1000 } format="d" />
            </header>
            <div className="dailyCards">
              <div className="dailyInfo">
                <span>4 NFT</span>
                <span>ABOUT TICKETS <img src={Union} alt="question" /> </span>
              </div>
              <div className="cards">
                {coupons.map((item, index) => (
                  <div key={index} style={item.get? {background: '#20313a'} : null} className="card">
                    <h4>{item.title}</h4>
                    <img src={item.icon} className={index===0 ? 'firstCard' : 'cardImg'} alt="card" />
                    <h4>{item.value}</h4>
                    {item.received ?
                      <img className="check" src={Check} alt="arrow" />
                    : <button onClick={item.get? () => setGetTicket(true) : null} style={item.get? {background: 'linear-gradient(246.26deg,#fff38b 13.13%,#ffe600 59.92%,#fe6b00 105.41%)', color: '#442910', cursor: 'pointer'} : null}>GET</button>}
                  </div>
                )) }
              </div>
            </div>
          </div>
          <div className="gloryBox">
            <h1>7 DAY</h1>
            <img src={Case_mini} alt="box" />
            <div className="light"/>
            <div className="lightBack"/>
            <button>GET</button>
          </div>
          <img src={Coupon1} className="card1" alt="card" />
          <img src={Coupon2} className="card2" alt="card" />
          <img src={Coupon3} className="card3" alt="card" />
        </div>
      </div>
      <h2 className="stakingHeader">STAKING</h2>
      <div className="characterContainer" onMouseDown={e => makeSliderActive(e)} onMouseLeave={() => removeSliderActive()} onMouseUp={() => removeSliderActive()} onMouseMove={e => containerSlide(e)}>
        <div className="addCharacter">
          <img src={Plus} alt="plus" />
          <button onClick={() => setAddBot(!addBot)}>ADD NFT CHARACTER</button>
        </div>
        {characterArr.map((item, index) => {
          return(
            <div key={index} className="character">
            <header>
              <img className="bot" src={Character} alt="character" />
              <div className="botInfo">
                <div className="botName">
                  <h3>BABY COMBAT BOT</h3>
                </div>
                <h3 className="num">#2481 G1</h3>
                <div className="status" style={item.status==='TRUE'?{color: 'white'} : null}>
                  <h2>{item.status}</h2>
                  <span>
                    17,5%
                  </span>
                </div>
                <div className="stop">
                  <img src={Stop} alt="stop" />
                  <span>STOP</span>
                </div>
              </div>
            </header>
            <div className="stats">
              <div className="coins">
                <div>
                  <img src={Coin} />
                  <h1>300,06</h1>
                </div>
                <span>~$87,22</span>
              </div>
              <div className="energy">
                <img src={Energy} />
                <h1>30</h1>
              </div>
            </div>
            <footer>
              <div className="footerInfo">
                <h3>1 DAY</h3>    
                <span>
                  <img src={Time} />
                  18:05
                </span>    
              </div>
              <div className="footerStats">
                <div style={item.select===0? {outline: '2px solid #FFFFFF'} : null} onClick={() => setStyleNum(index, 0)}>
                  <img src={Coin} />
                  <h3>0,40</h3>
                </div>
                <div style={item.select===1? {outline: '2px solid #FFFFFF'} : null} onClick={() => setStyleNum(index, 1)}>
                  <img src={Energy} />
                  <h3>5,5</h3>
                </div>
                <div className="mergeElems" style={item.select===2? {outline: '2px solid #FFFFFF'} : null} onClick={() => setStyleNum(index, 2)}>
                  <div>
                    <img src={Coin} />
                    <h3>0,2</h3>
                  </div>
                  <div className="border" />
                  <div>
                    <img src={Energy} />
                    <h3>5,5</h3>
                  </div>
                </div>
              </div>
              <span className="now">NOW</span>
            </footer>
          </div>
          )
        })}
      </div>        
      <button className="nftCharacterAdaptive" onClick={() => setAddBot(!addBot)}>ADD NFT CHARACTER</button>
      <div className="myEarnings">
        <div className="Earnings">
          <header>
            <h3>MY EARNINGS <span>4 NFT</span></h3>
            <span className="about">ABOUT STACKING <img src={Union} alt="union"/></span>
          </header>
          <div className="stats">
            <div className="totalQZQ">
              <span>TOTAL EARNED<span> QZQ</span></span>
              <div>
                <div>
                  <img src={Coin} alt="coin" />
                  <h1>900,06</h1>
                </div>
                <div>
                  <h4>4 NFT</h4>
                  <h4>ON STAKE</h4>
                </div>
              </div>
            </div>
            <div className="border" />
            <div className="totalEnergy">
              <span>TOTAL EARNED<span> ENERGY</span></span>
              <div>
                <div>
                  <img src={Energy} alt="energy" />
                  <h1>30</h1>
                </div>
                <div>
                  <h4>1 NFT</h4>
                  <h4>ON STAKE</h4>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <button>WITHDRAW</button>
            <p>For withdraw staking once a month commission is 0%.
            If more often, then the commission is 5%</p>
          </footer>
        </div>
        <div className="totalAmount">
          <h3>TOTAL AMOUNT STAKED</h3>
          <div className="info">
            <div>
              <img src={Coin} alt="coin" />
              <h1>759 145,06</h1>
            </div>
            <span>~ $9 364,48</span>
          </div>
          <footer>
            <h3>2569 NFT</h3>
            <h3>CHARACTERS</h3>
          </footer>
        </div>
      </div>
      {getTicket ?        
        <GetTicket setGetTicket={setGetTicket} setConfrts={setConfrts} /> 
      : null}
      {confrts ?        
        <Confrates setConfrts={setConfrts} />
      : null}      
      {addBot ?
        <AddBot setAddBot={setAddBot}  setAddBotStaking={setAddBotStaking} />
      : null}
      {addBotStaking ?
        <AddBotStaking setAddBotStaking={setAddBotStaking} setStopStaking={setStopStaking}/>
      : null}      
      {stopStaking ?
        <StopStaking setStopStaking={setStopStaking} setAddBotStaking={setAddBotStaking} />
      : null}      
    </div>
  )
}