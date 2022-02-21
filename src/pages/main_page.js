import React, { useState } from 'react'
import '../styles/main_page.scss'

import HeaderBanner from '../components/header_banner';
import Partnership from '../components/partnership';

// YOUTUBE 

import BlackShroom from '../assets/youtube_video/shrooms_back_night1.png'
import BlackShroom1 from '../assets/youtube_video/shrooms_back_night2.png'

// GENERATIONS

import Shroom1 from '../assets/generations/1.png'
import Shroom2 from '../assets/generations/2.png'
import Shroom3 from '../assets/generations/3.png'

import Group1 from '../assets/generations/Group1.png'
import Group2 from '../assets/generations/Group2.png'
import Group3 from '../assets/generations/Group3.png'

import Mushroom1 from '../assets/generations/mushroom1.png'
import Mushroom2 from '../assets/generations/mushroom2.png'
import Mushroom3 from '../assets/generations/mushroom3.png'

// SHROOMS 
import Shrooms_back from '../assets/shrooms/Frame5995.png'
import BattleShrooms from '../assets/shrooms/Frame5994.png'
import Shrooms_back1 from '../assets/shrooms/shrooms_back2 1.png'

// TEAM
import TeamBack from '../assets/team/Paricles.svg'

import Alex from '../assets/team/Alex.png'
import Alex1 from '../assets/team/Alex1.png'
import Sergey2 from '../assets/team/Sergey2.png'
import Pavel from '../assets/team/Pavel.png'
import Dima from '../assets/team/Dima.png'
import Egor from '../assets/team/Egor.png'

import Vlad from '../assets/team/Vlad.png'
import Kostya from '../assets/team/Kostya.png'
import Alex2 from '../assets/team/Alex2.png'
import Sergey from '../assets/team/Sergey.png'
import Ivan from '../assets/team/Ivan.png'
import Viktor from '../assets/team/Viktor.png'

// SERVICES 
import Linkedin from '../assets/services/linkedin.svg'
import Artstation from '../assets/services/artstation.svg'
import Behance from '../assets/services/behance.svg'
import Github from '../assets/services/github.svg'

export default function Main() {

  let [width, setWidth] = useState(window.innerWidth)

  window.addEventListener("resize", () => setWidth(window.innerWidth));

  const cards = [
    {color: '#20F582', img: Shroom1, gen: Group1, shroom: Mushroom1},
    {color: '#53F5FF', img: Shroom2, gen: Group2, shroom: Mushroom2},
    {color: '#FF3D6C', img: Shroom3, gen: Group3, shroom: Mushroom3}
  ]

  const team = [
    { member: Alex, name: 'ALEXANDER SIMAKOV', position: 'CO-FOUNDER, CVO', icon: Linkedin, link: 'https://www.linkedin.com/in/simakov5/' },
    { member: Alex1, name: 'ALEXEY KOVALENKO', position: 'CO-FOUNDER, PRINCIPAL ARTIST', icon: Artstation, link: 'https://www.artstation.com/kovalexart' },
    { member: Kostya, name: 'KONSTANTIN KOVALENKO', position: 'CO-FOUNDER, CG GENERALIST', icon: Linkedin, link: 'https://www.linkedin.com/in/eistan' },
    { member: Vlad, name: 'VLAD DRYAMOV', position: 'CO-FOUNDER, CEO', icon: Linkedin, link: 'https://www.linkedin.com/in/vlad-dryamov/' },

    { member: Sergey2, name: 'SERGEI BOLTUNOV', position: 'CMO', icon: Linkedin, link: 'https://www.linkedin.com/in/jimmipu' },
    { member: Sergey, name: 'SERGEI IVANOV', position: 'GAME DESIGNER', icon: Linkedin, link: 'https://www.linkedin.com/in/sergi-ivanov/' },
    { member: Pavel, name: 'PAVEL LEVCHUK', position: 'BLOCKCHAIN DEVELOPER', icon: Github, link: 'https://github.com/its5Q' },
    { member: Alex2, name: 'ALEXANDER BOLONDZ', position: 'CTO', icon: Linkedin, link: 'https://www.linkedin.com/in/aleksander-bolondz-70101012b/' },

    { member: Dima, name: 'DIMA BAGOW', position: 'PRODUCT MANAGER', icon: Linkedin, link: 'https://www.linkedin.com/mwlite/in/dimabagow' },
    { member: Ivan, name: 'IVAN GRIGORIEV', position: 'UNITY DEVELOPER', icon: Github, link: 'https://github.com/MagicProG' },
    { member: Viktor, name: 'VICTOR SOLTAN', position: 'FRONTEND DEVELOPER', icon: Github, link: 'https://github.com/VictorSoltan' },
    { member: Egor, name: 'EGOR MIRONOV', position: 'UX/UI DESIGN', icon: Behance, link: 'https://www.behance.net/EgorMironov' },
  ]


  return (
    <div className='mainPage'>
      <HeaderBanner />
      <div className='youtube_link'>
        <h1>Battle Shrooms </h1>
        <h4>are cute and dangerous{window.innerWidth < 600 && <br/>} at the same time</h4>
        <div className='youtubeVideo'>
          <img src={BlackShroom} alt="black shroom" />
          <iframe src="https://www.youtube.com/embed/5pDDQMzb4Xs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
          <img src={BlackShroom1} alt="black shroom" />
        </div>
      </div>
      <div className='generations'>
        <h4>Remember,{window.innerWidth < 800 && <br/>} 1st Gen NFTs <br/>
          will always be more valuable!</h4>
        <div className='lights'>
          {[...Array(2).keys()].map((index) => (
            <div className='lightContainer' key={index}>
              <div className='light' />
              <div className='particles'>
                {[...Array(window.width > 1024 ? Math.floor(Math.random() * 4 + 4) : Math.floor(Math.random() * 2 + 3)).keys()].map((indx) => (
                    <div className='particle' key={indx} 
                      style={{background: '#00C2FF', 
                        marginTop: Math.floor(Math.random() * 90) - 25 + "%",
                        marginLeft: Math.floor(Math.random(10) * 5) + "%",
                        animationDuration: Math.floor(Math.random() * 4 + 6) + "s"
                    }}/>
                ))}
              </div>
            </div>
          ))}
        </div>
        <h3>3 generations</h3>
        <div className='cards'>
          {cards.map((item, index) => (
            <div key={index} className='card'>
              <main>
                <div className='lightContainer'>
                  <div className='light' style={{ background: item.color }} />
                </div>
                <img src={item.img} alt="icon" className='shroom'/>
                <h4>GEN
                  <img src={item.gen} alt="gen" className='gen'/>
                </h4>
              </main>
              <footer>
                {index>0&&
                  <span>COMING SOON</span>
                }
                <img src={item.shroom} alt="shroom" />
                <span>5000</span>
              </footer>
            </div>
          ))}
        </div>
      </div>
      <div className='shrooms'>
          <img src={Shrooms_back}  className='backShroom'/>
          <div className='shroomContainer'>
            <div className='info'>
              <h1>Battle<br/> Shrooms</h1>
              <p>is your ticket to a vast<br/> and awesome Metaverse!</p>
            </div>
            <div className='image'>
              <div className='light' />
              <img src={BattleShrooms} />
            </div>
          </div>
          <img src={Shrooms_back1} className='backShroom' />
      </div>
      <Partnership />
      <div className='team' id="Team">
        <div className='blockInfo'>
          <h1>TEAM</h1>
          <p>Highly qualified, expertized and energetic professionals
            with experience in developing game projects</p>
        </div>
        <div className='members' style={{ backgroundImage: `url(${TeamBack})` }}>
          {team.map((item, index) => (
            <div key={index} className='memberInfo'>
              <img className='memberPic' src={item.member} alt={item.name} />
              <div className='memberText'>
                <h4>{item.name}</h4>
                <span>{item.position}</span>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img src={item.icon} alt={item.link} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}