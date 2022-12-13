import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

const Protected = (props) => {
  //eslint-disable-next-line
    const [cookies,setCookies] = useCookies(['login']);
    const navigate = useNavigate();
    let {Component} = props;
    useEffect(()=>{
        if(!cookies.login){
          navigate('/login');
        }
  //eslint-disable-next-line
    },[])
  return Component;
}

export default Protected;
