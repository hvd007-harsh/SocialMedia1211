import React,{useState} from 'react';
import { Form, Input, Button, FormField,Message,MessageContent } from 'semantic-ui-react';
import { Link , useNavigate } from 'react-router-dom';
import Axios from '../Utils/Axios';
import { useCookies } from 'react-cookie';


const Login = () => {
  //eslint-disable-next-line
  const [user,setuser] =useState({});
  const [message, setmessage] = useState('');
  const [cookie,setCookies]=useCookies(["login"]);
  const navigate = useNavigate();
  const submit=()=>{
    const Response = Axios.post('/api/login',user);
    Response.then(response=>{
      console.log(response);
      if(typeof(response.data.accesstoken)!== 'undefined'){
        setCookies("login",response.data.accesstoken,{maxAge:360000});
        if(cookie){ navigate("/"); }
      }
      else{
         setmessage(response.data.message);
      }
    })

  }
  return (
    <div>
      <h1>Login</h1>
      <Form>
      <FormField
         id="form-control-input-email"
         control={Input}
         label="Email"
         value = {user.email}
         onChange={(e)=>{ user.email = e.target.value}}
         className="input"
         placeholder='joe@schmoe.com'
      />
      <FormField
         id="form-control-input-password"
         control={Input}
         label="Password"
         value = {user.password}
         onChange={(e)=>{ user.password = e.target.value}}
         type='password'
         className="input"
         placeholder='joe@schmoe.com'
      />
      <Form.Field
       id='form-button-control-public'
       control={Button}
       content='Confirm'
       onClick={submit}
       label='Login'
     />
      </Form>
      <h4>
        Register if you are new here 
        <Link to={"/register"}> Register</Link> 
      </h4>
      <Message>
        <MessageContent>
          {message}
        </MessageContent>
      </Message>
    </div>
  )
}

export default Login;