import React, {useState} from 'react'
import '../styles/wallet.scss'

export default function Play({walletInstall, walletConnection, nameplate, installMetamask, signIn, changeNetwork, signin, setSignin, signed}){
  
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const auth = () => {
    if(name==='NotStranger'&&pass==='passToAvoidStrangers2506'){
      localStorage.setItem("gIUO87HJjho8jhJLK87HJjg", "NotStranger");
      setSignin(true)
    }else{
      alert('Wrong login or password')
    }
  }

  return(
    <div className="playContainer">   
      <div className="connectWalletContainer">
      {!signin ?
        <form className='login' onSubmit={event => {event.preventDefault(); auth()}}>
          <input placeholder="Enter Username" value={name} onChange={(e) => setName(e.target.value)} required></input>
          <input type="password" placeholder="Enter Password" value={pass} onChange={(e) => setPass(e.target.value)} required></input>
          <button type="submit">Submit</button>
        </form> 
        : !signed &&
        <button className="connectWallet" onClick={walletInstall ? () => installMetamask() : !nameplate ? () => signIn() : () => changeNetwork()}>
          {walletInstall?
          walletInstall 
          : !walletConnection?
          '🦊 CONNECTING WALLET'
          : !nameplate ?
            '🦊 CONNECT WALLET' 
          : nameplate}</button>
      }
      </div>
    </div>
  )
}