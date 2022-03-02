import './App.css';

import React from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Dashboard} from "./components/dashboard"
import Header from "./components/header"
import Wallet from "./components/wallet"
import Profile from './components/profile';
import Staking from './components/staking';
// import News from './components/news';
import Settings from './components/settings';

import Proccessing from './components/proccessing';

import { Marketplace } from './pages';
import { io } from "socket.io-client";
import { ethers } from "ethers"
import axios from 'axios'

function App() {

    let [openSwap, setOpenSwap] = React.useState(false),
        [signed, setSigned] = React.useState(false),
        [account, setAccount] = React.useState(null),
        [nameplate, setNameplate] = React.useState(null),
        [walletConnection, setWalletConnection] = React.useState(null),
        [walletInstall, setWalletInstall] = React.useState(null),
        [signin, setSignin] = React.useState(false),
        socketServer = 'back.battleverse.io',
		[socket, setSocket] = React.useState(null)
    
	const [verified, setVerified] = React.useState(false),
        [user, setUser] = React.useState(null)

    async function signAddress(message) {
        console.log(message.session_key)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const client_signature = await signer.signMessage(message.session_key)
        socket.emit('verify_signature', { "address": account, "signature": client_signature }, function (event, message) {
            console.log('emit response', event, message);
            console.log(socket)
            setVerified(true)
        });		
    };

    React.useEffect(() => {
        if(signed&&signin&&account&&user){
            const newSocket = io(`wss://${socketServer}/`);
            setSocket(newSocket);
            console.log('socket connected')
            console.log(newSocket)
        }
    }, [setSocket, signed, signin, account, user]);

    React.useEffect(() => {
        if(socket&&signed){
            socket.on('session_key', signAddress);
        }
    }, [socket]);


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
    if(!signin&&localStorage.getItem("gIUO87HJjho8jhJLK87HJjg") === "NotStranger"){
        setSignin(true)
    }
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
                if(response[0]) {
                    setSigned(true)
                    setAccount(response[0])
                }
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

    React.useEffect(() => {
        if(account){
            axios.get('https://tokens.battleverse.io/get_user', { params: { account: account } })
            .then(response => {
              console.log(response.data);
              if(response.data !== "No such user") setUser(response.data)
              else setUser(false)
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }, [account])
    return <Router>
        <Header openSwap={openSwap} setOpenSwap={setOpenSwap} account={account} signin={signin}/>
            {signed&&signin&&account ?
                <Routes>
                    {user ? 
                    <>
                    <Route path="/" element={
                        <Dashboard account={account} socket={socket} verified={verified} />
                    } />
                    <Route path="/no_nft" element={
                        <Dashboard account={account} socket={socket} verified={verified}/>
                    } />
                    <Route exact path="/staking" element={
                        <Staking />
                    } />
                    <Route exact path="/marketplace" element={
                        <Marketplace />
                    } />
                    <Route exact path="/profile" element={
                        <Profile account={account} />
                    } />
                    <Route exact path="/profile/settings" element={
                        <Settings account={account} sign={'SETTINGS'} />
                    } />     
                    </>
                    : user === false ?
                    <Route exact path="/" element={
                        <Settings account={account} sign={'Create account to enter game'} />
                    } />    
                    : 
                    <Route exact path="/" element={
                        <Proccessing />
                    } /> 
                    }        
                    {/* <Route exact path="/news">
                        <News />
                    </Route> */}
                </Routes>
            : !signed||!signin? <Wallet walletInstall={walletInstall} walletConnection={walletConnection} nameplate={nameplate} installMetamask={installMetamask} signIn={signIn} changeNetwork={changeNetwork} account={account} signin={signin} setSignin={setSignin} signed={signed}/>
            : null}
    </Router>
}

export default App;
