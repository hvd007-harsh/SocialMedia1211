import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react'
import Axios from '../Utils/Axios';

const Register = () => {
  //eslint-disable-next-line
  const [user, setuser] = useState({});

  const navigate = useNavigate();
  const [message, setmessage] = useState('')

  const submit = ()=>{
      console.log(user);
      const Response =  Axios.post('/api/register',user,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
    Response.then(response =>{
      console.log(response.data);
      setmessage(response.data.message);
     if(response.data){
      navigate('/login');
     }
    })
  }

  return (
    <div>
    <h1>Register</h1>
    <Form>
    <Form.Field
     id="form-input-control-image"
     control={Input}
     label="Profile Picture"
     value={user.image}
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
   <Form.Group widths='equal'>
   <Form.Field
     id='form-input-control-email'
     control={Input}
     label='Email'
     value = {user.email}
     onChange={(e)=>{ user.email = e.target.value}}
     placeholder='joe@schmoe.com'
   />
   <Form.Field 
    id="form-input-control-password"
    control={Input}
    value = {user.password}
    onChange={(e)=>{ user.password = e.target.value}}
    type="password"
    label="Password"
    placeholder="xyz@123"
    />
   </Form.Group>
   <Form.Group>
   <Form.Field
     id='form-button-control-public'
     control={Button}
     content='Confirm'
     label='Register'
     onClick={submit}
   />
    <h4>If Already exist <Link to={"/login"}> Login</Link> </h4>
   </Form.Group>
 </Form>
 {message ? <Message>{message}</Message>:""}

 </div>
  )
}

export default Register;