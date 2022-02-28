import './App.css';

import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Dashboard} from "./components/dashboard"
import Header from "./components/header"
import Wallet from "./components/wallet"
import Profile from './components/profile';
import Staking from './components/staking';
// import News from './components/news';
// import Settings from './components/settings';
// import { Marketplace } from './pages';
import EventEmitter from "events"
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  let [openSwap, setOpenSwap] = React.useState(false),
      [signed, setSigned] = React.useState(false),
      [account, setAccount] = React.useState(null),
      [nameplate, setNameplate] = React.useState(null),
      [walletConnection, setWalletConnection] = React.useState(null),
      [walletInstall, setWalletInstall] = React.useState(null),
      [signin, setSignin] = React.useState(true)
    

  async function changeNetwork() {
      await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{ 
              chainId: '0x38',
              chainName: 'Smart Chain',
              nativeCurrency: {
                  name: 'Binance Smart Chain',
                  symbol: 'BNB',
                  decimals: 18,
              },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
          }]
      })
      setSigned(true)
  }

  async function checkNetwork() {
      window.ethereum.request({ method: 'net_version' })
          .then((response) => { 
              if (response === '56'){
                  setSigned(true)
                  setWalletConnection(true) 
              }else{
                  setSigned(false)
                  setWalletConnection(true)                    
                  setNameplate('Change metamask network to BSC')
              }})
  }

  async function enterAccount() {
      const accounts = await window.ethereum.request({method: "eth_accounts"})
      .then((response) => {
          if(response[0]){
              setAccount(response[0])
              checkNetwork()
          }else{
              setNameplate(null)
              setSigned(false)
              setAccount(null)
              setWalletConnection('Connect Wallet')
          }
      })
      if(!window.ethereum.isConnected()){
          setWalletConnection('Connect Wallet')
      }
  }
  if(typeof window.ethereum !== 'undefined') enterAccount() 
  else if(!walletInstall) setWalletInstall('🦊 Install Metamask') 

  async function signIn() {
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
          .then((response) => {
              if(response[0]) 
              setSigned(true)
              setAccount(response[0])
          })
  }

  function installMetamask() {
      if(navigator.userAgent.indexOf("Chrome") != -1){
          window.location.href = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"    
      }else if(navigator.userAgent.indexOf("Firefox") != -1){
          window.location.href = "https://addons.mozilla.org/el/firefox/addon/ether-metamask/"    
      }
  }

  const handleNetworkChanged = () => {
      if(Number(window.ethereum.networkVersion) === 56) enterAccount()
      else setSigned(false)
  }

  if(typeof window.ethereum !== 'undefined'){
      
          window.ethereum.on('accountsChanged', enterAccount)

          window.ethereum.on('networkChanged', handleNetworkChanged);
  }

  return <Router>
      <Header openSwap={openSwap} setOpenSwap={setOpenSwap} account={account} signin={signin}/>
          {signed&&signin&&account ?
              <Routes>
                <Route path="/" element={
                    <Dashboard account={account} />
                } />
                <Route path="/no_nft" element={
                  <Dashboard account={account} />
                } />

              <Route exact path="/staking" element={
                  <Staking />
                } />
                  {/* <Route exact path="/marketplace" element={
                      <Marketplace />
                } /> */}
              <Route exact path="/profile" element={
                  <Profile account={account} />
                } />
              {/* <Route exact path="/news">
                  <News />
              </Route> */}
              {/* <Route exact path="/settings"element={
                  <Settings />
                } /> */}
              </Routes>
              : !signed||!signin? <Wallet walletInstall={walletInstall} walletConnection={walletConnection} nameplate={nameplate} installMetamask={installMetamask} signIn={signIn} changeNetwork={changeNetwork} account={account} signin={signin} setSignin={setSignin} signed={signed}/>
      : null}
  </Router>
}

export default App;
