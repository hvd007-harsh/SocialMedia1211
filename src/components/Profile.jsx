import React, { useEffect,useState } from 'react';
import {Card,CardContent,CardHeader,Icon,Image,Container} from 'semantic-ui-react';
import { useCookies } from 'react-cookie';
import Axios from '../Utils/Axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setuser] = useState({})
  const [cookie,setCookie] = useCookies(['login']);
 useEffect(() => {
  console.log("hi ");
  const Response =  Axios.post('/api/my_profile',{},{
      headers:{
        "Authorization":"Bearer "+cookie.login
      }
    })
    Response.then(response =>{
     console.log(response);
     setuser(response.data);
    })

 }, [])
 

  return (
    <div>
    <Container>
      <Card>
      <Image src={process.env.PUBLIC_URL+"/image/"+user.img} alt="image" />
      <Link to="/update_profile">
      <Icon name="edit" size='large' />
      </Link>
      <CardHeader id="name">{user.name}</CardHeader>
      <CardHeader id="address">{user.address}</CardHeader>
      <CardContent id="email">{user.email}</CardContent>
      </Card>
    </Container>
    </div>
  )
}

export default Profile