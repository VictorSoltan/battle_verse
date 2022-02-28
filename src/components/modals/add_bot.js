import React, {useState} from 'react' 
import '../../styles/modals/add_bot.scss'
import Slider from "react-slick";

import Coins from '../../assets/coins.svg'
import Rectangle0 from '../../assets/add_bot/rectangle0.png'
import Rectangle1 from '../../assets/add_bot/rectangle1.png'
import Rectangle2 from '../../assets/add_bot/rectangle2.png'

import Coin from '../../assets/qzq_coin.png'
import Energy from '../../assets/header/icon_energy.svg'

import ButtonPurple from '../../assets/add_bot/button_purple.svg'
import ButtonGray from '../../assets/add_bot/button_gray.svg'

export default function AddBot(props){

  let [bots, setBots] = useState([
    {img: Rectangle0, title: 'BABY COMBATS BOT', code: '#2558 G1', active: false},
    {img: Rectangle1, title: 'BABY COMBATS BOT', code: '#167 G1', active: true},
    {img: Rectangle2, title: 'BABY COMBATS BOT', code: '#862 G1', active: false},
    {img: Rectangle0, title: 'BABY COMBATS BOT', code: '#2558 G1', active: false},
    {img: Rectangle1, title: 'BABY COMBATS BOT', code: '#167 G1', active: false},
    {img: Rectangle2, title: 'BABY COMBATS BOT', code: '#167 G1', active: false},
    {img: Rectangle0, title: 'BABY COMBATS BOT', code: '#167 G1', active: false},
    {img: Rectangle1, title: 'BABY COMBATS BOT', code: '#167 G1', active: false},
    {img: Rectangle2, title: 'BABY COMBATS BOT', code: '#862 G1', active: false}
  ])

  let [styleNum, setStyleNum] = useState(0)

  function selectBot(index){
    let newArr = [...bots]
    for(let x=0; x<newArr.length; x++){
      newArr[x].active = false
    }
    newArr[index].active = true
    setBots(newArr)
  }

  let container

  function addContainer(){
    if(document.querySelector('.slider')){
      container = document.querySelector('.slider')
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
    const walk = (x - startX) * 3; //scroll-fast
    container.scrollLeft = scrollLeft - walk;
  }

  return(
    <div className="addBotContainer">
      <div className="botBackground" onClick={() => props.setAddBot(false)} />
      <div className="addBot">
        <div className="closeModal" dangerouslySetInnerHTML={{ __html: '&#x2715' }} onClick={() => props.setAddBot(false)}/>
        <h1>ADD BOT ON STAKING</h1>
        <header>
          <div>
            <button style={{backgroundImage: `url(${ButtonPurple})`}}>BOTS</button>
            <button style={{backgroundImage: `url(${ButtonGray})`}}>SHROOMS</button>
          </div>
          <span>#2558 G1</span>
        </header>
        <div className="slider" onMouseDown={e => makeSliderActive(e)} onMouseLeave={() => removeSliderActive()} onMouseUp={() => removeSliderActive()} onMouseMove={e => containerSlide(e)}>
          {bots.map((item, index) => (
            <div key={index} onClick={() => selectBot(index)} className={item.active ? "sliderBot active" : "sliderBot"}>
              <img src={item.img} draggable={false} alt="bot" />
            </div>
          ))}
        </div>
        <h2 className="stakingMode">STACKING MODE</h2>
        <div className="modes">
          <h3>1 DAY</h3>
          <h3>RARE</h3>
          <span>10,5%</span>
        </div>
        <div className="mode">
          <div className="modeElem" style={styleNum===0? {outline: '2px solid #FFFFFF'} : null} onClick={() => setStyleNum(0)}>
            <img src={Coin} alt="coin" />
            <h2>0,24</h2>
          </div>
          <div className="modeElem" style={styleNum===1? {outline: '2px solid #FFFFFF'} : null} onClick={() => setStyleNum(1)}>
            <img src={Energy} alt="energy" />
            <h2>10,3</h2>
          </div>
          <div className="mergeButton modeElem" style={styleNum===2? {outline: '2px solid #FFFFFF'} : null} onClick={() => setStyleNum(2)}>
            <div>
              <img src={Coin} alt="coin" />
              <h2>0,12</h2>
            </div>
            <div>
              <img src={Energy} alt="energy" />
              <h2>5,15</h2>
            </div>
          </div>
        </div>
        <h4>TRANSFER ON STAKING</h4>
        <h2>BABY COMBAT BOT #167 G1</h2>
        <div className="sliderLight"/>
        <button className="staking" onClick={() => {props.setAddBot(false), props.setAddBotStaking(true)}}>
          START STAKING
        </button>
      </div>
    </div>
  )
}