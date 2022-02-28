import React, {useState} from 'react'
import '../../styles/converter.scss'

import arrow from '../../assets/swap/arrow.svg'
import ArrowRight from '../../assets/swap/double-arrow.png'

import JsonContractERC20 from './contracts/contractERC20.json'
import JsonContractRouterBUSD from './contracts/contractRouterBUSD.json'

import Web3 from "web3"

import Icon_BUSD from '../../assets/swap/BUSD.png'
import Coin from '../../assets/qzq_coin.png'
import BVC from '../../assets/icon_bnb.png'


export default function Swap(props){
  let [btnTxt, setBtnTxt] = useState('ENTER AN AMOUNT'),
  [amount, setAmount] = useState(false),
  [insufficient, setInsufficient] = useState(true)
  // [showSwapData, setShowSwapData] = useState(false),
  // [showSwapConfirm, setShowSwapConfirm] = useState(false)

  let [input, setInput] = useState(''),
  [secondInput, setSecondInput] = useState(''),
  [qzqBalance, setQZQbalance] = useState(0),
  [BUSDBalance, setBUSDbalance] = useState(0),
  [defaultBtnTxt, setDefaultBtnTxt] = useState('NO BALANCE'),
  [transInfo, setTransInfo] = useState(''),
  [transInfoStatus, setTransInfoStatus] = useState(false)

  let [windows, setWindows] = useState([
    {name: 'You Pay', value: 'BALANCE', selectedItem: 'BUSD', placeholderInpute: 'Enter a value'},
    {},
    {name: 'You Receive', value: 'TOTAL', selectedItem: 'QZQ', placeholderInpute: '0.0'}
  ])

  const options = [
    { value: 'BUSD', icon: Icon_BUSD },
    { value: 'QZQ', icon: Coin },
    { value: 'BVC', icon: BVC }
  ]

  async function handleSubmit(){
    if(input===''&&String(secondInput)!=='NaN'){
      setBtnTxt('ENTER AN AMOUNT')
      setAmount(true)
    }else if(String(secondInput)==='NaN'){
      setBtnTxt('ENTER CORRECT VALUE')
    }else{
      if(windows[0].selectedItem==='BUSD'&&input>=BUSDBalance||windows[0].selectedItem==='QZQ'&&input>=qzqBalance){
        setAmount(false)
        setBtnTxt(`INSUFFICIENT ${windows[0].selectedItem} BALANCE`)
        // setShowSwapData(true)
        setInsufficient(false)
      }
      if(btnTxt==='ENTER AN AMOUNT'){
        if(windows[0].selectedItem==='BUSD'&&Number(input)<=BUSDBalance||windows[0].selectedItem==='QZQ'&&Number(input)<=qzqBalance){
          // setShowSwapData(false)
          // setShowSwapConfirm(true)
          setBtnTxt('APPLY')
        }
      }
      if(btnTxt==='APPLY'){
        setDefaultBtnTxt('PROCESSING...')
      }
    }
  }
  
  const handleAmount = (e) => {
    showReceiceBalance(e)
    // windows[0].selectedItem === 'QZQ' ? 
    // setSecondInput(e.target.value/100) : 
    // windows[0].selectedItem === 'BUSD' && 
    // setSecondInput(e.target.value*100)

    if(btnTxt==='ENTER AN AMOUNT'){
      if(e==='') setAmount(true)
    }
    if(btnTxt===`INSUFFICIENT ${windows[0].selectedItem} BALANCE`){
      if(windows[0].selectedItem==='BUSD'&&Number(e)<=BUSDBalance||windows[0].selectedItem==='QZQ'&&Number(e)<=qzqBalance){
        setInsufficient(true)
        setBtnTxt('ENTER AN AMOUNT')
      }
    }
  }

  let 
    rgx = /^[0-9]*\.?[0-9]*$/,
    web3,
    contract,
    contractQZQ,
    contractBUSD,
    contractRouterBUSD,
    isApprovedQZQ,
    isApprovedBUSD,
    QZQaddress = "0x9e69cA1850Ee19e9C02De9476339DfB3DD522856",
    BUSDaddress = "0xe5Eb60dE140F1FFAF23d12D3bE2Fc2a987F18518",
    BUSDrouterAddress = "0xFCe6FfBc442F6D7c9455a31de6aec749a0Cb7808"

  async function getData() {
    console.log("ready")

    web3 = new Web3(window.ethereum)

    contract = new web3.eth.Contract([{ "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "walletOfOwner", "outputs": [ { "name": "balances", "type": "uint256[]" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "name": "uri", "type": "string" } ], "payable": false, "type": "function"}], 
		"0xD558BF191abfe28CA37885605C7754E77F9DF0eF"),
    contractQZQ = new web3.eth.Contract(JsonContractERC20, QZQaddress),
    contractBUSD = new web3.eth.Contract(JsonContractERC20, BUSDaddress)
    contractRouterBUSD = new web3.eth.Contract(JsonContractRouterBUSD, BUSDrouterAddress)
    
    qzqBalance = Number(await contractQZQ.methods.balanceOf(props.account).call())/(10**18)
    setQZQbalance(qzqBalance)
    BUSDBalance = Number(await contractBUSD.methods.balanceOf(props.account).call())/(10**18)
    setBUSDbalance(BUSDBalance)

  
  }

  getData()
 

  // async function swapCurrency(){
  //   setBUSDbalance(0)
  //   setQZQbalance(0)
  //   const aTemp = option 
  //   const bTemp = secondOption 
  //   setOption(bTemp)
  //   setSecondOption(aTemp) 
  //   if(aTemp === 'QZQ'){
  //     setSecondInput(input*100)
  //   }else{
  //     setSecondInput(input/100)
  //   }
  // }

  function changeCurrency(index) {
    // setBUSDbalance(0)
    // setQZQbalance(0)
    showReceiceBalance(null)
  }

  function showReceiceBalance(e){
    let receive
    if(e||e===''){
      receive = e
    }else{
      receive = input
    }
    if(windows[0].selectedItem===windows[2].selectedItem){
      setSecondInput(receive)
    }else if(windows[0].selectedItem==='QZQ'&&windows[2].selectedItem==='BUSD') {
      setSecondInput(receive/100)
    }
    else if(windows[0].selectedItem==='BUSD'&&windows[2].selectedItem==='QZQ'){
      setSecondInput(receive*100)
    }
  }
  async function makeApprove(value){
    if(windows[0].selectedItem === 'BUSD'&&windows[2].selectedItem === 'QZQ') {
      isApprovedBUSD = (await contractBUSD.methods.allowance(props.account, BUSDrouterAddress).call()) > web3.utils.toWei(String(value), 'ether')
      if(!isApprovedBUSD){
        await contractBUSD.methods.approve(BUSDrouterAddress, '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
          .send({from: props.account}, async (error) => { 
            if(error) {
              console.log(error);
              setTransInfoStatus(false)
              setTransInfo('An error occurred during approve') 
              setTimeout(() => {
                setTransInfo('')
                props.setOpenSwap(!props.openSwap)
              }, 5000) 
            }
            else { 
              isApprovedBUSD = true;
              setTransInfoStatus(true)
              setTransInfo('Approve went successfully') 
              setTimeout(() => {
                setTransInfo('')
              }, 5000)
            } 
          })
      }    
    }else if(windows[0].selectedItem === 'QZQ'&&windows[2].selectedItem === 'BUSD'){
      isApprovedQZQ = (await contractQZQ.methods.allowance(props.account, BUSDrouterAddress).call()) > web3.utils.toWei(String(value), 'ether')
      if(!isApprovedQZQ){
        await contractQZQ.methods.approve(BUSDrouterAddress, '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
          .send({from: props.account}, async (error) => { 
            if(error) {
              console.log(error);
              setTransInfoStatus(false)
              setTransInfo('An error occurred during approve') 
              setTimeout(() => {
                setTransInfo('')
                props.setOpenSwap(!props.openSwap)
              }, 5000) 
            }
            else { 
              isApprovedQZQ = true 
              setTransInfoStatus(true)
              setTransInfo('Approve went successfully') 
              setTimeout(() => {
                setTransInfo('')
              }, 5000)
            } 
          })
      }
    }
  }

  async function swapCoins(value) {
    
    await makeApprove(value)

    if(windows[0].selectedItem === 'BUSD'&&windows[2].selectedItem === 'QZQ'){
      await contractRouterBUSD.methods.swapFromBUSD(web3.utils.toWei(String(10000000), 'ether'))
      .call({from: props.account}, async (error) => {
        if(error) {
          setTransInfoStatus(false)
          setTransInfo((error.message).slice((error.message).indexOf("message")+11, (error.message).indexOf('}')-2)) 
          setTimeout(() => {
            setTransInfo('')
          }, 5000)
        }
        else {
          setTransInfoStatus(true)
          setTransInfo('Transaction accepted without problems') 
          setTimeout(() => {
            setTransInfo('')
          }, 5000)
        }
      })
      await contractRouterBUSD.methods.swapFromBUSD(web3.utils.toWei(String(value), 'ether'))
        .send({from: props.account}, async (error, result) => {
          props.setOpenSwap(!props.openSwap)
          if(error) console.log(error)
          else console.log(result)
        }
      )
    }else if(windows[0].selectedItem === 'QZQ'&&windows[2].selectedItem === 'BUSD'){
      await contractRouterBUSD.methods.swapToBUSD(web3.utils.toWei(String(value), 'ether'))
      .call({from: props.account}, async (error) => {
        if(error) {
          setTransInfoStatus(false)
          setTransInfo((error.message).slice((error.message).indexOf("message")+11, (error.message).indexOf('}')-2)) 
          setTimeout(() => {
            setTransInfo('')
          }, 5000)
        }
        else {
          setTransInfoStatus(true)
          setTransInfo('Transaction accepted without problems') 
          setTimeout(() => {
            setTransInfo('')
          }, 5000)
        }
      })
      await contractRouterBUSD.methods.swapToBUSD(web3.utils.toWei(String(value), 'ether'))
        .send({from: props.account}, async (error, result) => { 
          props.setOpenSwap(!props.openSwap)
          if(error) console.log(error)
          else console.log(result)
        }
      )
    }
  }

  const swapChoosenTokens = () => {
    let newArr = [...windows]
    let temp = newArr[0].selectedItem
    newArr[0].selectedItem = newArr[2].selectedItem
    newArr[2].selectedItem = temp
    setWindows(newArr)
    showReceiceBalance()
  }

  return (
    <div className='converter'>
      <div className="shadowBackground" onClick={() => props.setOpenSwap(!props.openSwap)} />
      <div className='converterInner'>
        <h2 className='title'>Battle Verse Token Converter</h2>
        <div className='innerConverter'>
          <div className='windows'>
            {windows.map((elem, index) => (
              index !==1 ?
            <div className='convertWindow' key={index}>
              <header>
                <h2>{elem.name}</h2>
                  <div className='select'>
                    <div className='selected' onClick={e => {
                      if(e.currentTarget.nextSibling.style.display === 'none'){
                        e.currentTarget.nextSibling.style.display = 'block'
                        e.currentTarget.children[2].style.transform = 'rotate(90deg)'}
                      else{ e.currentTarget.nextSibling.style.display = 'none'
                        e.currentTarget.children[2].style.transform = 'rotate(0deg)'}
                    }}>
                      <img src={
                        elem.selectedItem === 'BUSD' ? 
                        Icon_BUSD
                      : elem.selectedItem === 'QZQ' ?
                      Coin
                      : BVC }/>
                      <h3>{elem.selectedItem}</h3>
                      <img src={arrow} />
                    </div>
                    <div className='options' style={{display: 'none'}}>
                      {options.map((item, indx) => (
                        <div key={indx} onClick={e => {
                            e.currentTarget.parentElement.style.display = 'none'
                            e.currentTarget.parentElement.previousSibling.children[2].style.transform = 'rotate(0deg)'
                            let newArr = [...windows]
                            if(index===2){
                              if(item.value === newArr[0].selectedItem) newArr[0].selectedItem = newArr[index].selectedItem
                            }else{
                              if(item.value === newArr[2].selectedItem) newArr[2].selectedItem = newArr[index].selectedItem
                            }
                            newArr[index].selectedItem = item.value
                            setWindows(newArr)
                            changeCurrency(index)
                          }}>
                          <img src={item.icon} />
                          <h3>{item.value}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
              </header>
              <main>
                {elem.value}: 
                &#160;
                &#160;
                <span>{
                  elem.selectedItem === 'BUSD' ? 
                    BUSDBalance
                  : elem.selectedItem === 'QZQ' &&
                    qzqBalance}</span>
                <img src={
                  elem.selectedItem === 'BUSD' ? 
                    Icon_BUSD
                  : elem.selectedItem === 'QZQ' ?
                    Coin
                  : BVC }/>
              </main>
              <footer>
                <input value={ index === 0 ? input : secondInput} placeholder={elem.placeholderInpute} 
                onChange={e => {index === 0 && setInput(e.target.value); handleAmount(e.target.value)}} 
                onKeyPress={(e) => !rgx.test(e.key) && e.preventDefault()} />
              </footer>
            </div>
            : <div className='arrow' key={index} onClick={() => swapChoosenTokens()}>
              <img src={ArrowRight} />
            </div>
          ))}
        </div>
        {transInfo !== '' &&
          <p style={{color: !transInfoStatus? '#FB3856' : '#72c900' }} className='transInfo'>{transInfo}</p>}
        {(windows[0].selectedItem==='BUSD'&&BUSDBalance===0||windows[0].selectedItem==='QZQ'&&qzqBalance===0)||defaultBtnTxt==='PROCESSING...' ? 
          <button className='mainButton' style={{background: 'linear-gradient(140deg, #20313A 8.91%, #13222A 90.52%)', color: '#07161f', cursor: 'default'}}>{defaultBtnTxt}</button>
        : <button className='mainButton' onClick={() => {handleSubmit(); btnTxt==='APPLY' && swapCoins(input)}}>{btnTxt}</button>
        }
      </div>
    </div>
  </div>
  )
}