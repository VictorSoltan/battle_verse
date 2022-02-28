import React, {useState} from 'react'
import '../styles/header.scss'
// import Swap from './modals/swap'

import Logo from '../assets/header/logo.png'
import Coin from '../assets/header/coin.png'
import Energy from '../assets/header/icon_energy.svg'
import Ava from '../assets/header/ava.png'
import Plus from '../assets/header/plus.svg'
import { Link } from 'react-router-dom';

export default function Header(props){
   
   const headerMenu = ['PLAY', 'STAKING', 'MARKETPLACE']
   const links = ['', 'staking', 'marketplace']
   let [menu, setMenu] = useState(false)

   return(
      <>
         <header className="header" style={(!props.account||!props.signin) ? {justifyContent: 'center'} : null}>
            <div className='header_content'>
               <img src={Logo} style={(!props.account||!props.signin) ? {paddingLeft: '0', margin: '0 auto'} : null} className="logo" alt="logo"/>
               {props.account&&props.signin ? 
               <>
               <div className="menu">
                  {headerMenu.map((item, index) => {
                     return(
                        <Link to={links[index]} key={index}>
                           <h4>{item}</h4>
                        </Link>
                     )
                  })}
               </div>
               <div className={!menu ? "userData" : "userData activeSubMenu"}>
                  <div className="adaptiveMenu">
                     {headerMenu.map((item, index) => {
                        return(
                           <Link onClick={() => setMenu(false)} to="staking" key={index}>
                              <h4>{item}</h4>
                           </Link>
                        )
                     })}
                  </div>
                  <div className="energyAmount">
                     <img src={Energy} className="coin" alt="coin"/>
                     <h4>15 500</h4>
                     <button onClick={() => props.setOpenSwap(!props.openSwap)}>
                        <img src={Plus} alt="plus"/>
                     </button>
                  </div>
                  <div className="coinsAmount">
                     <img src={Coin} className="coin" alt="coin"/>
                     <h4>15 500</h4>
                     <button onClick={() => {props.setOpenSwap(!props.openSwap)}}>
                        <img src={Plus} alt="plus"/>
                     </button>
                  </div>
                  <Link onClick={() => setMenu(false)} to="profile" className="avatar">
                     <img src={Ava} alt="avatar"/>
                     <h3>{props.account.length > 8 ?
                     String(props.account).slice(0, 6)+'...'+String(props.account).slice(-4)
                     : props.account}</h3>
                  </Link>
               </div>
               <div className={!menu ? "barMenu" : "barMenu activeMenu"} onClick={() => setMenu(!menu)}>
                  <div/>
                  <div/>
                  <div/>
               </div>
               </>
               : null}
            </div>
         </header>
         {/* {props.openSwap ? 
            <Swap setOpenSwap={props.setOpenSwap}  openSwap={props.openSwap} account={props.account}/>
         : null} */}
      </>
   )
}