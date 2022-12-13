import React from 'react';
import {Container,Icon}  from 'semantic-ui-react';

const Footer = () => {
  return (
    <div>
    <Container className='footer-container'>
       All Rights are reserved @2023
       
       <Icon name='instagram' size='large'/>
       <Icon name='facebook' size='large'/>
       <Icon name='whatsapp' size='large'/>
    </Container>
    </div>
  )
}

export default Footer;