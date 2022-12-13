import React,{useEffect, useState} from 'react';
import {CardHeader,Card,Image, CardContent} from 'semantic-ui-react';
import search from '../Utils/Search';
import { useCookies } from 'react-cookie';
import Axios from '../Utils/Axios';
import {useNavigate } from 'react-router-dom';

const Alluser = () => {
 const [users,setUsers] = useState([]);
 const navigate = useNavigate();
 //eslint-disable-next-line
 const [cookie,setCookies]= useCookies(['login']);
 const [message,setMessage] = useState('');
 
 

 useEffect(() => {
 const Response= Axios.get('/api/all_friend',{headers:{
   'authorization':"Bearer "+cookie.login
 }});
 Response.then(response =>{
   console.log(response.data);
   const id = response.data.userId;
   const user = search(id,response.data.alluser);
   setUsers(user);
 })
   //eslint-disable-next-line
 }, [])
 
 const addfriend =(i)=>{
    const friend_id = users[i]._id;
    console.log(friend_id);
   const Response = Axios.post('/api/add_friend',{friend_id},{
    headers:{
      "authorization":"Bearer " +cookie.login
    }
  });
   Response.then(response =>{
       console.log(response);
       setMessage(response.data.message);
   })
 }


  return (
    <div className='container'>
    {users.map((element,index)=>{
      return(
      <Card>
        <CardContent>
          <Image className='img-icon' src={process.env.PUBLIC_URL+"/image/"+element.img} alt="image" />
           <CardHeader>{element.name}</CardHeader>
             <button className='btn' value={index} onClick={()=>{addfriend(index)}}>Add Friend</button>
             <button className='btn-friend' value={index} onClick={()=>{navigate(element.name+"/"+element.img)}}>Show Profile</button>
           </CardContent>
      </Card>)
    })}
    </div>
  )
}

export default Alluser