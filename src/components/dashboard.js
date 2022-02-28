import React, {useState, useEffect, useMemo} from "react"
import Web3 from "web3"
import Unity, { UnityContext } from "react-unity-webgl"
import axios from 'axios'
import '../styles/dashboard.scss'
import { ethers } from "ethers"
import { io } from "socket.io-client";

export const Dashboard = (props) => {
  	const
		unityContext = useMemo(() => (
			new UnityContext({
    	  	 	loaderUrl: "Build/Build.loader.js",
    	  	 	dataUrl: "Build/Build.data.unityweb",
    	  	 	frameworkUrl: "Build/Build.framework.js.unityweb",
    	  	 	codeUrl: "Build/Build.wasm.unityweb",
    	  	 	streamingAssetsUrl: "StreamingAssets",
    	  	 	productName: "CryptoBots",
    	  	 	productVersion: "1.0.2"
			})
		), []),
		backendUrl = 'https://api.battleverse.io',
		socketServer = 'back.battleverse.io'  

  	let 
  		[unityWidth, setUnityWidth] = useState(null),
		[unityHeight, setUnityHeight] = useState(null),
		[socket, setSocket] = useState(null)

	const [nfts, setNfts] = useState({});

  	function reportWindowSize() {
  	  	let w = window.innerWidth, 
  	  	targetH = w * 850 / 1511.0,
  	  	h = window.innerHeight - 84
  	  	if (targetH < h) h = targetH      
  	  	else w = h * 1511 / 850.0
  	  	setUnityHeight(String(h) + "px")
  	  	setUnityWidth(String(w) + "px")
  	}

  	let 
  	  	web3,
  	  	contract,
  	  	contractBattle,
  	  	contractQZQ,
		addressBattle = "0x07308A32c96F4ce4967370F1D4046E11509ab990",
		wallet,
  	  	//balance,
		isApprovedQZQ = false,
		offers,
		accepts,
		waitingAcceptedOffer = false,
  	  	uris,
		loaded

  	let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

	useEffect(() => {
		const newSocket = io(`wss://${socketServer}/`);
		setSocket(newSocket);
		console.log('socket connected')
		console.log(newSocket)

		console.log("get_data")
		if(window.location.pathname==='/no_nft'){
			wallet = '0xc04032bcbcce4d43ef978cc808f1d2da5c0db3c3'
		}else{
			wallet = props.account
		}
		console.log(wallet)
		axios(`${backendUrl}/nfts/${wallet}`)
		.then(result => {
			console.log(result.data)
			setNfts(result.data)
		})

		web3 = new Web3(window.ethereum)
		contractBattle = new web3.eth.Contract([{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"nftTokenAddress","type":"address"},{"internalType":"address","name":"_beneficiary","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"offerId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"acceptId","type":"uint128"},{"indexed":false,"internalType":"address","name":"acceptor","type":"address"},{"indexed":false,"internalType":"uint256","name":"nft","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bet","type":"uint256"},{"indexed":false,"internalType":"enum GameContract.NFTType","name":"nfttype","type":"uint8"}],"name":"Accept","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"offerId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"acceptId","type":"uint256"}],"name":"AcceptCancel","type":"event"},{"inputs":[{"internalType":"address","name":"offerCreator","type":"address"},{"internalType":"uint128","name":"offerId","type":"uint128"},{"internalType":"uint256","name":"nft","type":"uint256"},{"internalType":"enum GameContract.NFTType","name":"nfttype","type":"uint8"}],"name":"AcceptOffer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"components":[{"components":[{"internalType":"uint256","name":"Id","type":"uint256"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_1","type":"tuple"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_2","type":"tuple"}],"internalType":"struct BattleContract.Round","name":"_roundsLog1","type":"tuple"},{"components":[{"internalType":"uint256","name":"Id","type":"uint256"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_1","type":"tuple"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_2","type":"tuple"}],"internalType":"struct BattleContract.Round","name":"_roundsLog2","type":"tuple"},{"components":[{"internalType":"uint256","name":"Id","type":"uint256"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_1","type":"tuple"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_2","type":"tuple"}],"internalType":"struct BattleContract.Round","name":"_roundsLog3","type":"tuple"},{"components":[{"internalType":"enum BattleContract.EArenaType","name":"_arena","type":"uint8"},{"components":[{"components":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"enum BattleContract.EWeaponType","name":"_weapon","type":"uint8"},{"internalType":"enum BattleContract.EToyType","name":"_toy","type":"uint8"},{"internalType":"enum BattleContract.EPlatformType","name":"_platform","type":"uint8"}],"internalType":"struct BattleContract.BotData","name":"botData","type":"tuple"},{"internalType":"int256","name":"Hp","type":"int256"},{"internalType":"uint256","name":"CritRound","type":"uint256"},{"internalType":"uint256","name":"BlockRound","type":"uint256"}],"internalType":"struct BattleContract.Bot","name":"_bot_1","type":"tuple"},{"components":[{"components":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"enum BattleContract.EWeaponType","name":"_weapon","type":"uint8"},{"internalType":"enum BattleContract.EToyType","name":"_toy","type":"uint8"},{"internalType":"enum BattleContract.EPlatformType","name":"_platform","type":"uint8"}],"internalType":"struct BattleContract.BotData","name":"botData","type":"tuple"},{"internalType":"int256","name":"Hp","type":"int256"},{"internalType":"uint256","name":"CritRound","type":"uint256"},{"internalType":"uint256","name":"BlockRound","type":"uint256"}],"internalType":"struct BattleContract.Bot","name":"_bot_2","type":"tuple"}],"internalType":"struct BattleContract.Battle","name":"battle","type":"tuple"}],"indexed":false,"internalType":"struct BattleContract.Log","name":"log","type":"tuple"},{"indexed":false,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"uint256","name":"offerId","type":"uint256"}],"name":"BattleEnd","type":"event"},{"inputs":[{"internalType":"uint256","name":"offerId","type":"uint256"},{"internalType":"uint256","name":"acceptId","type":"uint256"}],"name":"CancelAccept","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offerId","type":"uint256"}],"name":"CancelOffer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nft","type":"uint256"},{"internalType":"enum GameContract.NFTType","name":"nfttype","type":"uint8"},{"internalType":"uint256","name":"bet","type":"uint256"}],"name":"CreateOffer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"uint128","name":"offerId","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"nft","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bet","type":"uint256"},{"indexed":false,"internalType":"enum GameContract.NFTType","name":"nfttype","type":"uint8"}],"name":"Offer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"uint256","name":"offerId","type":"uint256"}],"name":"OfferCancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"setBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"enum BattleContract.EWeaponType","name":"_weapon","type":"uint8"},{"internalType":"enum BattleContract.EToyType","name":"_toy","type":"uint8"},{"internalType":"enum BattleContract.EPlatformType","name":"_platform","type":"uint8"}],"name":"SetBotData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offerId","type":"uint256"},{"internalType":"uint256","name":"acceptId","type":"uint256"}],"name":"StartBattle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"_Test","outputs":[{"components":[{"components":[{"internalType":"uint256","name":"Id","type":"uint256"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_1","type":"tuple"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_2","type":"tuple"}],"internalType":"struct BattleContract.Round","name":"_roundsLog1","type":"tuple"},{"components":[{"internalType":"uint256","name":"Id","type":"uint256"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_1","type":"tuple"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_2","type":"tuple"}],"internalType":"struct BattleContract.Round","name":"_roundsLog2","type":"tuple"},{"components":[{"internalType":"uint256","name":"Id","type":"uint256"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_1","type":"tuple"},{"components":[{"internalType":"int256","name":"hpBefore","type":"int256"},{"internalType":"int256","name":"hpAfter","type":"int256"},{"internalType":"uint256","name":"attack","type":"uint256"},{"internalType":"uint256","name":"crit","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"},{"internalType":"uint256","name":"platform","type":"uint256"},{"internalType":"bool","name":"isCrit","type":"bool"}],"internalType":"struct BattleContract.RoundBot","name":"Bot_2","type":"tuple"}],"internalType":"struct BattleContract.Round","name":"_roundsLog3","type":"tuple"},{"components":[{"internalType":"enum BattleContract.EArenaType","name":"_arena","type":"uint8"},{"components":[{"components":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"enum BattleContract.EWeaponType","name":"_weapon","type":"uint8"},{"internalType":"enum BattleContract.EToyType","name":"_toy","type":"uint8"},{"internalType":"enum BattleContract.EPlatformType","name":"_platform","type":"uint8"}],"internalType":"struct BattleContract.BotData","name":"botData","type":"tuple"},{"internalType":"int256","name":"Hp","type":"int256"},{"internalType":"uint256","name":"CritRound","type":"uint256"},{"internalType":"uint256","name":"BlockRound","type":"uint256"}],"internalType":"struct BattleContract.Bot","name":"_bot_1","type":"tuple"},{"components":[{"components":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"enum BattleContract.EWeaponType","name":"_weapon","type":"uint8"},{"internalType":"enum BattleContract.EToyType","name":"_toy","type":"uint8"},{"internalType":"enum BattleContract.EPlatformType","name":"_platform","type":"uint8"}],"internalType":"struct BattleContract.BotData","name":"botData","type":"tuple"},{"internalType":"int256","name":"Hp","type":"int256"},{"internalType":"uint256","name":"CritRound","type":"uint256"},{"internalType":"uint256","name":"BlockRound","type":"uint256"}],"internalType":"struct BattleContract.Bot","name":"_bot_2","type":"tuple"}],"internalType":"struct BattleContract.Battle","name":"battle","type":"tuple"}],"internalType":"struct BattleContract.Log","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"offerId","type":"uint256"}],"name":"GetAccepts","outputs":[{"components":[{"internalType":"uint128","name":"id","type":"uint128"},{"internalType":"uint128","name":"offerId","type":"uint128"},{"internalType":"address","name":"acceptor","type":"address"},{"internalType":"enum GameContract.NFTType","name":"nfttype","type":"uint8"},{"internalType":"uint256","name":"nft","type":"uint256"},{"internalType":"uint256","name":"bet","type":"uint256"}],"internalType":"struct GameContract.GameAccept[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"GetBotData","outputs":[{"components":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"enum BattleContract.EWeaponType","name":"_weapon","type":"uint8"},{"internalType":"enum BattleContract.EToyType","name":"_toy","type":"uint8"},{"internalType":"enum BattleContract.EPlatformType","name":"_platform","type":"uint8"}],"internalType":"struct BattleContract.BotData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"GetOffers","outputs":[{"components":[{"internalType":"uint128","name":"id","type":"uint128"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"enum GameContract.NFTType","name":"nfttype","type":"uint8"},{"internalType":"uint256","name":"nft","type":"uint256"},{"internalType":"uint256","name":"bet","type":"uint256"}],"internalType":"struct GameContract.GameOffer[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
			, addressBattle)
		contractQZQ = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"player","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"payReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],
			"0x9e69cA1850Ee19e9C02De9476339DfB3DD522856")
			
		return () => newSocket.close();
	}, [setSocket]);

	function getData(){
  	  	//await window.ethereum.enable();




  	  //balance = parseInt(await contract.methods.balanceOf(wallet).call())

		/*contractBattle.events.Offer({})
  	  .on('data', async function(event){
  	      console.log("We catch battle offer");
  	      console.log(event.returnValues);
  	      // Do something here
  	  })*/
	}
//   getData()

		//наш оффер кто то принял
	async function getAcceptedOffer() {
		if(offers && offers.length > 0) {
			/*accepts = offers[0].accepts;
			if(accepts.length > 0)
			{
				let acceptsJson = {
					id: accepts[0].id,
					nftId: accepts[0].nft,
					nftType: accepts[0].nft_type,
					nftUri: accepts[0].nft_uri,
					address: accepts[0].acceptor,
					bet: accepts[0].bet,
				}
				unityContext.send("Systems", "OnBotsWeb3CreateBattle", JSON.stringify(acceptsJson))
			}*/
			axios(`${backendUrl}/battles/accepts?offer_id=${offers[0].id}`)
			.then(async result => {	
				accepts = result.data;
				if(result.data.length > 0)
				{
					waitingAcceptedOffer = false;
					let acceptsJson = {
						id: result.data[0].id,
						nftId: result.data[0].nft,
						nftType: result.data[0].nft_type,
						nftUri: result.data[0].nft_uri,
						address: result.data[0].acceptor,
						bet: result.data[0].bet,
					}
					//unityContext.send("Systems", "OnBotsWeb3CreateBattle", JSON.stringify(acceptsJson))
					unityContext.send("Systems", "OnBotsWeb3EnemyAcceptOffer", JSON.stringify(acceptsJson));
				}
			})
			/*accepts = await contractBattle.methods.GetAccepts(offers[0][0]).call()
			if(accepts && accepts.length > 0)
			{
				unityContext.send("Systems", "OnBotsWeb3EnemyAcceptOffer", JSON.stringify({id:accepts[0][0], address:accepts[0][2], nftId:accepts[0][4], nftType:accepts[0][3], nftUri:await contract.methods.tokenURI(accepts[0][4]).call(),bet:accepts[0][5]}));
			}*/
		}
	}
  
	async function getIsApprovedQZQ() {
		isApprovedQZQ = true
		// (await contractQZQ.methods.allowance(props.account, addressBattle).call()) > 0
		if(isApprovedQZQ)
		{
			unityContext.send("Systems", "OnBotsWeb3ApproveQZQ", 1)
		}
	}
	function parseLog(logData) {
		let log = {
			arena:+logData[3][0],
		}
		for(let i = 0; i < 3; i++)
		{
			log["round"+i] = {
				bot1:{
					attack:+logData[i][1][2],
					isCrit:logData[i][1][6],
					hpBefore:+logData[i][1][0],
					hpAfter:+logData[i][1][1],
				},
				bot2:{
					attack:+logData[i][2][2],
					isCrit:logData[i][2][6],
					hpBefore:+logData[i][2][0],
					hpAfter:+logData[i][2][1],
				}					
			}
		}
		console.log(JSON.stringify(log));
		return log;
	}
  

	// function handleMouseMove(e) {
	// 	if(document.querySelector('.tutorial')){
	// 		let tutor = document.querySelectorAll('.tutorial'),
	// 		 	x = (e.clientX + 20) + 'px',
	// 	    	y = (e.clientY + 20) + 'px';
	// 	    for (let i = 0; i < tutor.length; i++) {
	// 	        tutor[i].style.top = y;
	// 	        tutor[i].style.left = x;
	// 	    }
	// 	}
    // }


  	useEffect(() => {
		let loaded = false
		if(socket){
			async function signAddress(message) {
				console.log(message.session_key)
				const provider = new ethers.providers.Web3Provider(window.ethereum)
				const signer = provider.getSigner();
				const client_signature = await signer.signMessage(message.session_key)
				socket.emit('verify_signature', { "address": props.account, "signature": client_signature }, function (event, message) {
					console.log('emit response', event, message);
					console.log(socket)
					socket.emit('get_battles_list', {address: props.account}, async function(message){
						let response = JSON.parse(message)
						console.log('get_battles_list ', response)
						if(response.length){

							let offersJson = {
								id: response[0].id,
								nftId: response[0].nft_id,
								nftType: response[0].nft_type,
								nftUri: response[0].uri,
								address: response[0].owner_address,
								bet: Number(response[0].bet),
							}
	
							while(!loaded) await wait(500)
							unityContext.send("Systems", "OnBotsWeb3CreateBattle", JSON.stringify(offersJson))
						}
					})
				});		
		    };

		    socket.on('session_key', signAddress);

    		if(!unityWidth) reportWindowSize()
    		window.addEventListener("resize", reportWindowSize, false);
    		document.querySelector("#unity-loading-bar").style.display = "block"

    		unityContext.on("progress", value => {
    		  // console.log("progress", value)
    		  const progressBarFull = document.querySelector("#unity-progress-bar-full")
    		  progressBarFull.style.width = 100 * value + "%"
    		})

    		unityContext.on("BotsWeb3NftDataRequest", async () => {
				while (!nfts) wait(500)
				unityContext.send("Systems", "OnBotsWeb3NftData", JSON.stringify(
					{
						shrooms: nfts.shrooms, 
						bots: nfts.bots
					}
				))
				
			    await getIsApprovedQZQ()
				
				// await getBattle()		
				// await getAcceptedOffer()
    		})

    		unityContext.on("loaded", () => {
				document.querySelector("#unity-loading-bar").style.display = "none"
				loaded = true
    		})

    		unityContext.on("ButtonEnter", () => {
    		  	if(document.querySelector('#unity-canvas-1')){
    		    	document.querySelector('#unity-canvas-1').style.cursor = 'pointer'
    		  	}
    		})
		
    		unityContext.on("ButtonExit", () => {
    		  	if(document.querySelector('#unity-canvas-1')){
					document.querySelector('#unity-canvas-1').style.cursor = 'default'
    		  	}
    		})

			// Мы хотим аппрув QZQ
    		unityContext.on("BotsWeb3ApproveQZQRequest", async () => {
    		  contractQZQ.methods.approve(addressBattle, "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({from:props.account}, async (error, result) => { 
				  if(error)
				  {
				  }
				  else
				  {			  
					  while(!isApprovedQZQ) 
					  {
						  await wait(1500)
						  await getIsApprovedQZQ()
					  }
				  }
			  })
    		})

			// Мы хотим создать битву
    		unityContext.on("BotsWeb3CreateBattleRequest", async (nft, nftType, nftUri, bet) => {
				socket.emit('create_battle_offer', { nft_id: nft, nft_type: nftType, bet: bet, data: {} }, function (event) {
					let response = JSON.parse(event)
					console.log('create_battle_offer ', response)

					let offersJson = {
						id: response.id,
						nftId: response.nft_id,
						nftType: response.nft_type,
						nftUri: response.uri,
						address: props.account,
						bet: Number(response.bet),
					}
					
					unityContext.send("Systems", "OnBotsWeb3CreateBattle", JSON.stringify(offersJson))
				});		
    		})

			socket.on('accept_added', function (event) {
				let response = JSON.parse(event)

				let offersJson = {
					id: String(response.id),
					address: props.account,
					nftId: String(response.nft_id),
					nftType: response.nft_type,
					nftUri: response.uri,
					bet: response.bet,
				}
				console.log('accept_added ', offersJson)

				unityContext.send("Systems", "OnBotsWeb3EnemyAcceptOffer", JSON.stringify(offersJson));
			});		

			socket.on("started_battle", function (event) {
				let response = JSON.parse(event)

				let offersJson = {
					id: String(response.id),
					address: props.account,
					nftId: String(response.nft_id),
					nftType: response.nft_type,
					nftUri: response.uri,
					bet: response.bet,
				}
				console.log('started_battle ', offersJson)

				unityContext.send("Systems", "OnBotsWeb3EnemyStartBattle", JSON.stringify(offersJson));
			});		

			// Мы хотим принять чью-то битву
    		unityContext.on("BotsWeb3AcceptOfferRequest", async (offerId, address, nft, nftType, nftUri, bet) => {
				socket.emit('accept_offer', {nft_id: nft, nft_type: nftType, battle_id: offerId}, function (event) {
					try {
						let response = JSON.parse(event)

						console.log('accept_offer ', response);

						let offerStr = {
							id: String(response.id), 
							nftId: response.nft_id, 
							nftUri: response.uri, 
							nftType: response.nft_type, 
							address: response.owner_address, 
							bet: response.bet
						};
	
						unityContext.send("Systems", "OnBotsWeb3AcceptOffer", JSON.stringify(offerStr));
					  } catch (e) {
						console.error(e instanceof SyntaxError);
						getBattleList()
					}

				});		
    		})

			// Мы хотим отменить битву
    		unityContext.on("BotsWeb3CancelOfferRequest", async (offerId) => {
				console.log('cancel battle')
				// 	unityContext.send("Systems", "OnBotsWeb3CancelOffer");

			
				// await contractBattle.methods.CancelOffer(offerId).send({from:props.account}, async (error, result) => { 
				// 	if(error)
				// 	{
				// 	}
				// 	else
				// 	{		
				// 		console.log(result);


				// 	}
				// }).on('receipt', function(receipt){
				// 	// receipt example
				// })
    		})

			// Мы хотим начать битву, которую создали и кто-то принял
    		unityContext.on("BotsWeb3StartBattleRequest", async (offerId, acceptId) => {
				console.log('start_battle')
				console.log({battle_id: offerId, accept_id: acceptId})
				socket.emit('start_battle', { battle_id: offerId, accept_id: acceptId }, function (event) {
					let response = JSON.parse(event)
					console.log("start_battle ", response)

					let offerStr = {
						id: String(response.id), 
						nftId: response.nft_id, 
						nftUri: response.uri, 
						nftType: response.nft_type, 
						address: response.owner_address, 
						bet: response.bet
					};

					unityContext.send("Systems", "OnBotsWeb3StartBattle", JSON.stringify({offerStr}));
				});		
				// await contractBattle.methods.StartBattle(offerId, acceptId).send({from:props.account}, async (error, result) => {
				// 	if(error)
				// 	{
				// 	}
				// 	else
				// 	{			
				// 		let waitingReceipt = true;
				// 		while(waitingReceipt)
				// 		{
				// 			let receipt = await web3.eth.getTransactionReceipt(result)
				// 			if(!receipt)
				// 			{
				// 				await wait(1500);
				// 				continue;
				// 			}
				// 			console.log(receipt);
				// 			/*let rich_logs = contractBattle.events.Logs().processReceipt(receipt)
				// 			for(let log in rich_logs)
				// 			{
				// 				if(log.event == "Logs")
				// 				{
				// 				 // unityContext.send("Systems", "OnBotsWeb3StartBattle", ""+log.args["0"]);
				// 				}
				// 			}*/
				// 			break;
				// 		}
				// 	}
				// }).on('receipt', async function(receipt){
				// 	// receipt example
				// 	console.log(receipt);
				// 	let logData = receipt.events.BattleEnd.returnValues.log
				// 	let log = parseLog(logData);
				// 	unityContext.send("Systems", "OnBotsWeb3StartBattle", JSON.stringify(log));
				// })
    		})
			// Сокет запрос на список битв
			function getBattleList(){
				console.log('get_recommended_battles')
				socket.emit('get_recommended_battles', async function(message){		

					let response = JSON.parse(message)
					console.log("get_recommended_battles ", response)
					unityContext.send("Systems", "OnBotsWeb3GetOffers", JSON.stringify({
						offers: await Promise.all(response.slice(0, 6).map(async elem => (
						{
							id: String(elem.id),
							nftId: String(elem.nft_id),
							nftType: elem.nft_type,
							nftUri: elem.uri,
							address: elem.owner_address,
							bet: elem.bet
						})	
					))}))
				})
			}
			// Запрос списка битв при переходе на страницу battle
    		unityContext.on("BotsWeb3GetOffersRequest", async () => {
				getBattleList()
			})
			// ПРОТИВНИК ПОХОДИЛ 
			socket.on("round_ended", function (event) {
				 console.log('round_ended ', event)

				let offersJson = {
					leftChoice: event.left_choice,
					rightChoice: event.right_choice,
					leftHp: event.left_hp,
					rightHp: event.right_hp
				}

				unityContext.send("Systems", "OnBotsWeb3BattleRound", JSON.stringify(offersJson))
			});	

    		// ХОДЫ В ИГРЕ 
			unityContext.on("BotsWeb3TurnBattle",  (choice) => {
				console.log(choice)
				socket.emit('make_move', {choice: choice}, function (event) {
					console.log('make_move event ', event)
				});		
			})

			return () => {
    		  const loadingBar = document.querySelector("#unity-loading-bar")
    		  loadingBar.style.display = "none"
    		}
		}
  	}, [socket, nfts])

  	return (
    	<div className="dashboard"> 
    	  	<div id="layoutSidenav_content">
    	  	  	<main>
    	  	  	  	<div className="container-fluid px-4">
    	  	  	  	  	<div className="row">
    	  	  	  	  	  <div className="unity-desktop" id="unity-container">
								<Unity unityContext={unityContext} style={{width: unityWidth, height: unityHeight, display: !socket && 'none'}} id="unity-canvas" />
							</div>
    	  	  	  	  	</div>
    	  	  	  	</div>
    	  	  	</main>
    	  	</div>
    	</div>
  	)	
}

