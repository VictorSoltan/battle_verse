import React from 'react' 

import '../styles/header_banner.scss'

// PARTICLES 
import Blue from '../assets/header/particles/blue.svg'
import Blue1 from '../assets/header/particles/blue1.svg'
import Blue2 from '../assets/header/particles/blue2.svg'
import Blue3 from '../assets/header/particles/blue3.svg'
import Blue4 from '../assets/header/particles/blue4.svg'

import Green from '../assets/header/particles/green.svg'
import Green1 from '../assets/header/particles/green2.svg'
import Green2 from '../assets/header/particles/green3.svg'
// AdaptPARTICLES 
import adaptGreen0 from '../assets/header/adaptParticles/Group6002.svg'
import adaptGreen1 from '../assets/header/adaptParticles/Group6003.svg'
import adaptGreen2 from '../assets/header/adaptParticles/Group6004.svg'
import adaptGreen3 from '../assets/header/adaptParticles/Group6005.svg'
import adaptGreen4 from '../assets/header/adaptParticles/Group6006.svg'
import adaptGreen5 from '../assets/header/adaptParticles/Group6007.svg'
import adaptGreen6 from '../assets/header/adaptParticles/Group6008.svg'

import Video from '../assets/header/shroom-anim_05.mp4'
import VideoAdaptive from '../assets/header/shroom-anim_05.mp4'
import Top3 from '../assets/header/1.png'

import Discord from '../assets/services/discord.svg'
import In from '../assets/services/in.svg'
import Telegram from '../assets/services/telegram.svg'
import Twitter from '../assets/services/twitter.svg'
import Medium from '../assets/services/medium.svg'

export default function HeaderBanner() {

  const blueParticles = [
    Blue,
    Blue1,
    Blue2,
    Blue3,
    Blue4 ]

  const greenParticles = [ 
    Green, 
    Green1, 
    Green2 ]

  const adaptGreen = [
    adaptGreen0,
    adaptGreen1,
    adaptGreen2,
    adaptGreen3,
    adaptGreen4,
    adaptGreen5,
    adaptGreen6 ]

  const footer = [
    {icon: Discord, color: '#525FFF',
      link: 'https://discord.com/invite/HFVAnBS9qA'},
    {icon: In, color: '#00A6FF',
      link: 'https://ru.linkedin.com/company/battleverse-io?trk=ppro_cprof'},
    {icon: Telegram, color: '#00A7FF',
      link: 'https://t.me/battleverse_news'},
    {icon: Twitter, color: '#0084FF',
      link: 'https://twitter.com/BattleVerse_io'},
    {icon: Medium, color: '#000000', 
      link: 'https://battleverse.medium.com/'}
  ]

  let [width, setWidth] = React.useState(window.innerWidth)

  window.addEventListener("resize", () => setWidth(window.innerWidth));

  return(
    <div className='contentContainer'>
      <div className='content'>
        <div className='lights'>
            <div className='light' />
            <div className='light' />
        </div>
        <div className='particlesAnime'>
          {window.innerWidth > 800 ?
            <>
              <div className='blueParticles'>
                {blueParticles.map((item, index) => (
                  <img key={index} src={item} alt="particle" />
                ))}
              </div>
              <div className='greenParticles'>
                {greenParticles.map((item, index) => (
                  <img key={index} src={item} alt="particle"/>
                ))}
              </div>
            </> : 
            <div className='adaptGreenParticles'>
              {adaptGreen.map((item, index) => (
                <img key={index} src={item} alt="particle"/>
              ))}
            </div> 
          }
        </div>
        <div className='info'>
          <div className='battle_shrooms'>
            <img src={Top3} alt="top3" />
            <h4>Battleverse’s<br/> SECOND RACE</h4>
          </div>
          <h2  style={{display: window.innerWidth < 800 ? 'none' : 'block' }}>Mint your first<br/> Shroom, <span>join the<br/> adventure!</span></h2>
          <div className='links' style={{display: window.innerWidth < 800 ? 'none' : 'block' }}>
            {[{link: 'http://shrooms.battleverse.io', value: 'MINT'}].map((item, index) => (
              <a key={index} 
                onMouseDown={e => {e.target.style.fontSize = '16px'; e.target.style.marginInline = '2px'; e.target.style.filter = 'brightness(85%)'}}
                onMouseLeave={e => {e.target.style.fontSize = '18px'; e.target.style.marginInline = '0px'; e.target.style.filter = 'brightness(100%)'}} 
                onMouseUp={e => {e.target.style.fontSize = '18px'; e.target.style.marginInline = '0px'; e.target.style.filter = 'brightness(100%)'}} 
                href={item.link} rel="stylesheet" target="_blank" rel="noopener noreferrer">
                {item.value}
              </a>
            ))}
            <div id="via-widget" data-id="ace4c308-e20d-4a70-82eb-91db2fea7a89"/>
          </div>          
        </div>
        <div className='threeD'>
          <div className='particles'/>
          <video controls={false} src={window.innerWidth > 1024 ? Video : VideoAdaptive} loop={true} muted={true} autoPlay={true} playsInline={true} />            
          <h2 style={{display: window.innerWidth < 800 ? 'block' : 'none' }}>Mint your first {window.innerWidth > 800 &&<br/>} Shroom, <span>join the<br/> adventure!</span></h2>
          <div className='links' style={{display: window.innerWidth < 800 ? 'block' : 'none' }}>
            {[{link: 'http://shrooms.battleverse.io', value: 'MINT'}].map((item, index) => (
              <a key={index} 
                onMouseDown={e => {e.target.style.fontSize = '16px'; e.target.style.marginInline = '2px'; e.target.style.filter = 'brightness(85%)'}}
                onMouseLeave={e => {e.target.style.fontSize = '18px'; e.target.style.marginInline = '0px'; e.target.style.filter = 'brightness(100%)'}} 
                onMouseUp={e => {e.target.style.fontSize = '18px'; e.target.style.marginInline = '0px'; e.target.style.filter = 'brightness(100%)'}} 
                href={item.link} target="_blank" rel="noopener noreferrer">
                {item.value}
              </a>
            ))}
          </div>                 
        </div>
      </div>
      <footer>
        {footer.map((item, index) => (
          <a onMouseEnter={e => {e.target.style.background = item.color}} 
            onMouseLeave={e => {e.target.style.background = '#241F45'; e.target.style.padding = width>800? '0.7em' : '0.6em'; e.target.style.margin = width>800? '0em 1em 0em 0em' : '0em 0.8em 0em 0em'; e.target.style.filter = 'brightness(100%)'}} 
            onMouseDown={e => {e.target.style.padding = width>800? '0.6em':'0.5em'; e.target.style.margin = width>800? '0.1em 1.1em 0.1em 0.1em' : '0.1em 0.9em 0.1em 0.1em'; e.target.style.filter = 'brightness(55%)'}} 
            onMouseUp={e => {e.target.style.padding = width>800? '0.7em' : '0.6em'; e.target.style.margin = width>800? '0em 1em 0em 0em' : '0em 0.8em 0em 0em'; e.target.style.filter = 'brightness(100%)'}} 
            href={item.link} key={index} target="_blank" rel="noopener noreferrer">
            <img src={item.icon} alt="icon" />
          </a>
        ))}
      </footer>
    </div>
  )
}