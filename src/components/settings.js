import React, {useState} from 'react' 
import '../styles/settings.scss'

import Ava from '../assets/settings/ava.png'
import Checkbox from '../assets/settings/checkbox.svg'

import { Formik } from 'formik';
import * as Yup from 'yup';

export default function Settings(){
  


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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    email: Yup.string().email().required(),
    discord: Yup.string()
  })
  function chooseFile() {
    document.querySelector('.browse-img').click();
 }
  const loadFile = (e) => {
    let image = document.querySelector('.avatarus');
    image.src = URL.createObjectURL(e.target.files[0])
    console.log(image)
    console.log(e.target.files[0])
  };

  return(
    <div className='settings'>
      <div className='innerSettings'>
        <h1>SETTINGS</h1>
        <div className='settingsContainer'>
          <Formik
            initialValues={{ 
            name: '', description: '', email: '', discord: '' }}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              alert('s')
            }}>
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, isValid, dirty, touched, errors, values, submitForm, setErrors }) => (
            <form onSubmit={handleSubmit} className='user'>
             <div className="form">
                <div className='ava'>
                  <div>
                    <div className="avaContainer">
                      <img src={Ava} alt="avatar" className='avatarus'/>
                    </div>
                    <input className="browse-img" type="file"  accept="image/*" name="image" id="file" placeholder='CHANGE' onChange={loadFile} />
                    <button type="button" onClick={() => chooseFile()}>CHANGE</button>
                  </div>
                </div>
                <div className='userInfo'>
                  <h2>BASIC INFORMATION</h2>
                  <label>NAME</label>
                  <input                       
                    style={errors.name ? {border: '2px solid #FB3856', margin: '-2px'} : null}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholder={'Enter your name'} />
                  {errors.name ?
                    <p>Name is required</p>
                  : null }                
                  <label>DESCRIPTION</label>
                  <textarea className='description'/>
                  <label>E-MAIL</label>
                  <input
                    type="email"
                    name="email"
                    style={errors.email ? {border: '2px solid #FB3856', margin: '-2px'} : null}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder={'E-Mail'}/>
                  {errors.email&&values.email==='' ?
                    <p>Email address is required</p>
                  : errors.email&&values.email!=='' ?
                    <p>Invalid email address</p>
                  : null }
                  <label>DISCORD</label>
                  <input/>
                </div>
              </div>
              <div className='buttons'>
                <button className="cancel">CANCEL</button>
                <button className="accept" type="submit">ACCEPT</button>
              </div>
            </form> )}     
          </Formik>  
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