import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react'
import Axios from '../Utils/Axios';
import { useCookies } from 'react-cookie';

const ProfileEdit = () => {
  //eslint-disable-next-line
  const [user, setuser] = useState({});

  const [message, setmessage] = useState('');
  //eslint-disable-next-line
  const [cookie,setCookie] = useCookies(['login']);
  const submit = ()=>{
      console.log(user);
    const Response =  Axios.put('/api/update_profile',user,{
      headers:{
        "authorization":"Bearer "+cookie.login,
        "Content-Type":"multipart/form-data"
      }
    });
    Response.then(response =>{
      console.log(response.data);
      setmessage(response.data.message);
    })
  }

  return (
    <div>
    <h1>Update Profile</h1>
    <Form>
    <Form.Field
     id="form-input-control-image"
     control={Input}
     label="Profile Picture"
     value={user.image}
     accept="image/png,image/jpg,image/jpeg"
     onChange={(e)=>{
         user.image = e.target.files[0];
     }}
     placeholder="image"
     type='file'
    />
   <Form.Group widths='equal'>
     <Form.Field
       id='form-input-control-first-name'
       control={Input}
       value = {user.name}
       onChange = {(e)=>{ 
        user.name= e.target.value
        }}
       label='Name'
       placeholder='Name'
     />
   </Form.Group>
   <Form.Field
     id='form-textarea-control-opinion'
     control={TextArea}
     label='Address'
     value = {user.address}
     onChange={(e)=>{ user.address = e.target.value}}
     placeholder='H.No City Country Pincode'
   />
   <Form.Group>
   <Form.Field
     id='form-button-control-public'
     control={Button}
     content='Confirm'
     label='Update'
     onClick={submit}
   />
    <h4>If Already exist <Link to={"/login"}> Login</Link> </h4>
   </Form.Group>
 </Form>
 {message ? <Message>{message}</Message>:""}

 </div>
  )
}

export default ProfileEdit