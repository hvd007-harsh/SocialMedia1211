import React, { useState } from 'react'
import { Menu,Icon,Button } from 'semantic-ui-react';
import { Link, useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Axios from '../Utils/Axios';
const NavBar = ()=>{
  const [activeItem, setActiveItem] = useState('home');
  //eslint-disable-next-line
  const [cookie,setCookies,removeCookies]=useCookies(["login"]);
  const navigate = useNavigate();

  const handleItemClick = (e)=>{
    console.log(e.target);
    setActiveItem(e.target.name);
  }
  const logout =()=>{

   const Response =  Axios.post('/api/logout');
   Response.then(response =>{
    console.log(response.data.message);
        if(response.data.message==="LogOut"){
          removeCookies('login');
          navigate('/');
        }
   })
  }
  //eslint-disable-next-line
    return (
      <div>
        <Menu pointing secondary>
         <Link to={"/"}>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
         </Link>
         <Link to={"/message"}>
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={handleItemClick}
          />
         </Link>
         <Link to={"/friends"}>
          <Menu.Item
            name='All user'
            active={activeItem === 'friends'}
            onClick={handleItemClick}
          />
         </Link>
         <Link to={"/my_profile"}>
          <Menu.Item
            name='My Profile'
            active={activeItem === 'friends'}
            onClick={handleItemClick}
          />
         </Link>
         <Link to={"/my_friend"}>
          <Menu.Item
            name='My Friend'
            active={activeItem === 'friends'}
            onClick={handleItemClick}
          />
         </Link>
          <Menu.Menu position='right'>
        {(cookie.login)?(
          <Button onClick={logout}>
            <Icon name='user' size='large'/>
            Logout
          </Button>
        ):(
          <Link to={"/login"}>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
            />
          </Link>
        )}
         
          </Menu.Menu>
        </Menu>
      </div>
    )
  }

export default NavBar;