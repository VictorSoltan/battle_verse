import React, {useState} from 'react' 
import '../styles/settings.scss'

import FormikComponent from './formikComponent'

import Checkbox from '../assets/settings/checkbox.svg'

import axios from 'axios'

export default function Settings({account, sign}){
  
  let [wallets, setWallets] = useState([
    {selected: true, wallet: '0xE182FE73482eb02cb266704D2B7dB27F1c85Ada0'},
    {selected: false, wallet: '0xZ42L4H2P34HPlJ33ioJjljJLK342KkjlkLKJ4320'}
  ])

  function selectWallet(indx){
    let newArr = [...wallets]
    for(let x=0; x<newArr.length; x++){
      newArr[x].selected=false
    }
    newArr[indx].selected = true
    setWallets(newArr)
  }

  const [user, setUser] = useState(null)

  React.useEffect(() => {
    axios.get('https://tokens.battleverse.io/get_user', { params: { account: account } })
    .then(response => {
      console.log(response.data);
      if(response.data !== "No such user") setUser(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  return(
    <div className='settings'>
      <div className='innerSettings'>
        <h1>{sign}</h1>
        <div className='settingsContainer'>
          <FormikComponent user={user} account={account} avatar={''} />
          <div className='myWallet'>
            <h2>MY WALLET</h2>
              {wallets.map((item, index) => {
                return(
                  <div key={index}>
                    {item.selected?
                      <img src={Checkbox} alt="selected" />
                    : <input onClick={() => selectWallet(index)}/>}
                    <span>{item.wallet.length > 10 ?
                      String(item.wallet).slice(0, 8)+'.......'+String(item.wallet).slice(-8)
                    : item.wallet}</span>
                    <button>LOG OUT</button>
                  </div>
                )
              })}
            <button className="addWallet">ADD WALLET</button>
          </div>
        </div>
      </div>
    </div>
  )
}