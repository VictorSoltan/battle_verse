import React, {useState, useEffect} from 'react'
import '../styles/profile.scss'
import { Link } from 'react-router-dom';
import axios from 'axios'

import Ava from '../assets/ava.png'
import Copy from '../assets/profile/copy.png'
import YellowSwards from '../assets/yellowSwards.png'
import Swards from '../assets/swards.png'

import Energy_barell from '../assets/profile/energy_barell.png'
import Bot from '../assets/profile/bot.png'
import Case_mini from '../assets/profile/case.png'

import Time from '../assets/profile/time.svg'

import Energy from '../assets/header/icon_energy.svg'
import Flash from '../assets/profile/flash.svg'

import CharacterPlus from '../assets/profile/bots/character_plus.png'

export default function Content(props){
  let [energyNum, setEnergyNum] = useState(1358)

  let [num, setNum] = useState(0)
  let [timeFilter, setTimeFilter] = useState(0)

  let [botInfo, setBotInfo] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get('https://tokens.battleverse.io/get_user', { params: { account: props.account } })
    .then(response => {
      console.log(response.data);
      if(response.data !== "No such user") setUser(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });

    let newArr = []
    const fetchData = async () => {
      await axios.get(`https://api.battleverse.io/nfts/${props.account}`, 30000)
      .then( async(response) => {
        for(let x=0; x<response.data.shrooms.length; x++){
          await axios.get((response.data.shrooms[x].uri).replace('http://', 'https://'))
          .then((res) => {
            newArr.push({icon: res.data.image, value: 100, active: false})
          })
        }
        for(let x=0; x<response.data.bots.length; x++){
          await axios.get((response.data.bots[x].uri).replace('http://', 'https://'))
          .then((res) => {
            newArr.push({icon: res.data.image, value: 100, active: false})
          })
        }      
      })
      newArr.push({icon: CharacterPlus, value: 100, active: false})
      setBotInfo(newArr)
    };

    fetchData();
  }, [])

  let container
  function addContainer(){
    if(document.querySelector('.myItemsSlider')){
      container = document.querySelector('.myItemsSlider')
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

  let container1
  function addContainer1(){
    if(document.querySelector('.bots')){
      container = document.querySelector('.bots')
    }
  }
  
  let isDown1 = false;
  let startX1;
  let scrollLeft1;
  
  function makeSliderActive1(e) {
    addContainer()
    isDown1 = true;
    container.classList.add('active');
    startX1 = e.pageX - container.offsetLeft;
    scrollLeft1 = container.scrollLeft1;
  }
  function removeSliderActive1() {
    addContainer1()
    isDown1 = false;
    container.classList.remove('active');
  }

  function containerSlide1(e) {
    addContainer()
    if(!isDown1) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX1) * 2;
    container.scrollLeft1 = scrollLeft1 - walk;
  }

  return(
    <div className="content">
      <div className='innerContent'>

        <div className="contentTop">
          <div className="userInfo">
            <div className="avaContainer">
              {user && 
                <img src={user.avatar!=='' ? user.avatar : Ava} alt="avatar" />}
            </div>
            <div className="accountInfo">
              <h1>{user && user.name}
                <img src={Copy} alt="copy" />
              </h1>
                <div className="info">
                  <span>E-mail</span>
                  <h5>{user && user.email}</h5>
                </div>
                <div className="info">
                  <span>Discord</span>
                  <h5>{user && user.discord}</h5>
                </div>              
            </div>
            <Link className="link" to="settings">CHANGE</Link>
          </div>
        </div>

        <div className="statsInfo">
          <div>
            <h2>RATING</h2>
            <img alt="" className="ratingImg" />
            <div className="border">
              <div className="bar" />
            </div>
            <h3>1 350 546</h3>
          </div>
          <div>
            <h2>ACHIEVEMENTS</h2>
            <div className="achivementsContainer">
              {['ACHIEVEMENTS', 'ACHIEVEMENTS', 'ACHIEVEMENTS', 'ACHIEVEMENTS'].map((item, index) => {
                return(
                  <div key={index}>
                    <img alt="" />
                    <h4>{item}</h4>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="userGameContainer">
          <div className="userGameInfo">
            <div className="userGameButtons">
              {['DUELS','RACING'].map((item, index) => {
                return(
                  <>
                  {index===num?
                  <button key={index} className="active">{item}</button>
                  :<button key={index} onClick={() => setNum(index)}>{item}</button>}
                  </>
                )
              })}
            </div>
            <div className="userGameInfoDiv">
              <img src={Swards} alt="swards" />
              <div className="userGameInfoContent">
                <div className="rates">
                  <div>
                    <span>WON</span>
                    <h1>1358</h1>
                  </div>
                  <div>
                    <span>DROW</span>
                    <h1>1530</h1>
                  </div>
                  <div>
                    <span>LOSE</span>
                    <h1>1000</h1>
                  </div>
                </div>
                <div className="buttons">
                {['DAYS','MONTH','YEARS'].map((item, index) => {
                return(
                  <>
                  {index===timeFilter?
                    <button key={index} className="active">{item}</button>
                    :<button key={index} onClick={() => setTimeFilter(index)}>{item}</button>}
                  </>
                )
              })}
                </div>
              </div>
            </div>
          </div>
          <div className="userGame">
            <img src={YellowSwards} alt="swards" />
            <div className="imgLight" />
            <span>BATTLES</span>
            <h2>3518</h2>
          </div>
        </div>
        
        <div className="energyBlock">
          <div className="energyBarell">
            <div className="energyBlockBack" />
            <div className="energyBarellContent">
              <img src={Energy_barell} alt="energy_barell" className="energyBarellImg"/>
              <div className="barellLight" />
              <div className="barellLightBack" />
              <div>
                <img src={Energy} alt="energy" />
                <h2>{energyNum} </h2>
                <h4> /10 000</h4>
              </div>
            </div>
          </div>
          <div className="botEnergy">
            <div className="botEnergyBack" />
            <div className="botEnergyContent">
              <div className="botContent">
                <img src={Bot} alt="bot" className="bot"/>
                <div className="botLight" />
                <footer>
                  <img src={Energy} alt="energy" />
                  <div className="energyBar">
                    <div className="border">
                      <div className="bar" style={{height:'24px',width:'20%'}}></div>
                    </div>
                    <div>
                      <h5>80</h5>
                      <span>
                        <img src={Time} alt="time" /> 18:05</span>
                    </div>
                  </div>
                  <span className="num">#2481 G1</span>
                </footer>
              </div>
              <div className="energyAmount">
                <h3>TEXT ABOUT ENERGY</h3>
                <div className="amount">
                  <button onClick={() => setEnergyNum(energyNum-1)}>-</button>
                  <div>
                    <img src={Energy} alt="energy" />
                    <h2>{energyNum}</h2>
                  </div>
                  <button onClick={() => setEnergyNum(energyNum+1)}>+</button>
                </div>
                <button className="accept">ACCEPT</button>
              </div>
            </div>
          </div>
        </div>
        {botInfo.length ?
        <div className="bots" onMouseDown={e => makeSliderActive1(e)} onMouseLeave={() => removeSliderActive1()} onMouseUp={() => removeSliderActive1()} onMouseMove={e => containerSlide1(e)}>
          {botInfo.map((item, index) => {
            return(
              <div key={index} className={item.active ? "bot" : "bot"}>
                  <img alt="bot" src={item.icon} className="botImg"/>
                <footer>
                  <img src={Flash} alt="flash" />
                  <div className="progressBar">
                    <div className="border">
                      <div className="bar" style={{width: String(item.value)+"%"}} />
                    </div>
                    <span>{item.value}</span>
                  </div>
                </footer>
              </div>
            )
          })}
        </div> : null}
        <div className="myItems" >
          <h2>MY ITEMS</h2>
          <div className="myItemsSlider">
            <div className="myItemsContainer" onMouseDown={e => makeSliderActive(e)} onMouseLeave={() => removeSliderActive()} onMouseUp={() => removeSliderActive()} onMouseMove={e => containerSlide(e)}>
              {[1,2,3,4,5,6,7,8,9].map((item,index) => {
                return(
                  <div key={index}>
                    <img src={Case_mini} alt="case" />
                    <h5>BOX #124</h5>
                    <span>NFT SROOM G1</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <svg style={{visibility: 'hidden', position: 'absolute'}} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="round">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />    
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
          </defs>
      </svg>
    </div>
  )
}