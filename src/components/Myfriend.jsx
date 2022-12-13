import React,{useEffect, useState} from 'react';
import {CardHeader,Card,Image,Icon, CardContent} from 'semantic-ui-react';
import { useCookies } from 'react-cookie';
import Axios from '../Utils/Axios';
import { useNavigate } from 'react-router-dom';



const Myfriend = () => {
 const [users,setUsers] = useState([]);
 const navigate = useNavigate();
 //eslint-disable-next-line
 const [cookie,setCookies]= useCookies(['login']);

 useEffect(() => {
    const Response= Axios.get('/api/my_friend',{
      headers:{
      'authorization':"Bearer "+cookie.login
    }});
    Response.then(response =>{
      console.log(response);
      console.log(response.data);
      const user = response.data.friend;
      setUsers(user);
    })
      //eslint-disable-next-line
    }, [])

  return (
    <div className='container'>
    <button onClick={()=>{navigate(-1)}}>
        <Icon name='arrow left' size='large'/>
    </button>
    {users?.map((element,index)=>{
      return(
      <Card>
        <CardContent>
          <Image className='img-icon' src={process.env.PUBLIC_URL+"/image/"+element.img} alt="image" />
          <CardHeader>{element.name}</CardHeader>
        </CardContent>
      </Card>)
    })}
    </div>
  )
}

export default Myfriend;