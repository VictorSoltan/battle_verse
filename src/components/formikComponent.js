import React from 'react'
import axios from 'axios'
import { Formik } from 'formik';
import { ethers } from "ethers"
import * as Yup from 'yup';

import Ava from '../assets/settings/ava.png'

export default function FormikComponent({user, account, avatar}) {
    const 
      validationSchema = Yup.object().shape({
        name: Yup.string().required('Required')
        .max(15, 'Must be 15 characters or less'),
        description: Yup.string()
        .max(200, 'Must be 200 characters or less'),
        email: Yup.string().email('Invalid email address').required('Required')
        .max(20, 'Must be 20 characters or less'),
        discord: Yup.string()
        .max(20, 'Must be 20 characters or less')
      })

    function chooseFile() {
        document.querySelector('.browse-img').click();
     }

    let [img, setImg] = React.useState('')
     
      const loadFile = async(e) => {
        let image = document.querySelector('.avatarus');
        // console.log(image)
        console.log(e.target.files[0].size)
        const base64 = await convertBase64(e.target.files[0])
        if(e.target.files[0].size > 140000){
          alert(e.target.files[0].size/140000)
          alert(e.target.files[0].size/(e.target.files[0].size/140000))
          const resizedImge = await reduce_image_file_size(base64, e.target.files[0].size/140000)
          setImg(resizedImge) 
          image.src = resizedImge
        }else{
          setImg(base64) 
          image.src = base64
        }
      };

      async function reduce_image_file_size(base64Str, resizeNumb) {
        let resized_base64 = await new Promise((resolve) => {
          let img = new Image()
          img.src = base64Str
          img.onload = () => {
            let canvas = document.createElement('canvas')
            let width = (img.width/resizeNumb)
            let height = (img.height/resizeNumb)
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL()) // this will return base64 image results after resize
          }
        });
        return resized_base64;
      }

      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)

          fileReader.onload = () => {
            resolve(fileReader.result)
          }

          fileReader.onerror = (error) => {
            reject(error)
          }
        })
      }

    return(
      <Formik
        enableReinitialize={true}
        initialValues={
          user ? user :
          {name: "", description: "", email: "", discord: ""}}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={ async(values, actions) => {
          let message
          await axios.get('https://tokens.battleverse.io/verification')
          .then(function (response) {
            message = response.data
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner();
          const client_signature = await signer.signMessage(message)
          let endpoint 
          if(!user) endpoint = "create_user"
          else endpoint = "change_user_data"
          axios.post(`https://tokens.battleverse.io/${endpoint}`, {
            signature: client_signature,
            account: account,
            name: values.name,
            avatar: img,
            description: values.description,
            email: values.email,
            discord: values.discord
          })
          .then(function (response) {
            console.log(response);
            if(endpoint==="create_user") location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
        }}>
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, isValid, dirty, touched, errors, values, submitForm, setErrors }) => (
        <form onSubmit={handleSubmit} className='user'>
         <div className="form">
            <div className='ava'>
              <div>
                <div className="avaContainer">
                  {!user?
                  <img src={Ava} alt="avatar" className='avatarus'/>
                :
                  <img src={user.avatar!=='' ? user.avatar : Ava} alt="avatar" className='avatarus'/>
                }
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
              {errors.name &&
                <p>{errors.name}</p>}                
              <label>DESCRIPTION</label>
              <textarea className='description'
                name="description"
                onChange={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                placeholder={'description'}/>
                {errors.description &&
                  <p>{errors.description}</p> }                 
              <label>E-MAIL</label>
              <input
                type="email"
                name="email"
                style={errors.email ? {border: '2px solid #FB3856', margin: '-2px'} : null}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={'E-Mail'}/>
                {errors.email &&
                  <p>{errors.email}</p> }
              <label>DISCORD</label>
              <input  
                name="discord"
                onChange={handleChange('discord')}
                onBlur={handleBlur('discord')}
                value={values.discord}
                placeholder={'Discord'}/>
                {errors.discord &&
                  <p>{errors.discord}</p> }                
            </div>
          </div>
          <div className='buttons'>
            <button className="cancel">CANCEL</button>
            <button className="accept" type="submit">ACCEPT</button>
          </div>
        </form> )}     
      </Formik>          
    )
}