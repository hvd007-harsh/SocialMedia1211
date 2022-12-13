import './App.css';
import {Dashboard,Navbar,Footer, Login, Register, Alluser, MyProfile, ShowProfile, ProfileEdit,Myfriend} from './components';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import { useEffect, useState } from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import Protected from './Utils/Protected';

function App() { 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
    {/* Loader start */}
     { loading ? (
      <div>
    <Segment>
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>

      <Image src='/img/loading.png' />
    </Segment>
  {/* Loader end */}
  </div>
      ): (
    <div className="App">
    <CookiesProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
     <Route path='/' element={<Dashboard/>} />
     <Route path='/friends' element={<Protected Component={<Alluser/>}/>}/>
     <Route path='/my_profile' element={<Protected Component={<MyProfile/>}/>}/>
     <Route path='/update_profile' element={<Protected Component={<ProfileEdit/>}/>}/>
     <Route path="/login" element={<Login/>} />
     <Route path="/friends/:name/:img" element = {<Protected Component={<ShowProfile/>}/>}/>
     <Route path='/my_friend' element = {<Protected Component={<Myfriend/>}/>}/>
     <Route path="/register" element={<Register/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </CookiesProvider>
    </div>
   )}
   </>
  );
}

export default App;
