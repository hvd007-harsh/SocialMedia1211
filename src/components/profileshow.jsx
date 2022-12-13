import React from 'react';
import {useParams} from 'react-router-dom';

import {Card,CardContent,CardHeader,Icon,Image,Container} from 'semantic-ui-react';

const Profileshow = () => {
  const {img,name} = useParams();
  console.log(img,name);
  return (
    <div>
    <Container>
    SHOW PROFILE
    <Card>
    <Image src={process.env.PUBLIC_URL+"/image/"+img} alt="image" />
    <CardHeader id="name">{name}</CardHeader>
    </Card>
  </Container></div>
  )
}

export default Profileshow