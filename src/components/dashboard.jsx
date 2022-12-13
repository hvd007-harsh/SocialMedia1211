import React from 'react';
import {Container,Image} from 'semantic-ui-react';

const Dashboard = () => {
   return <div>
    <Container>
      <h1>Social Media Application</h1>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique consectetur sequi nulla deserunt sint tempora nostrum minima illum dolorem commodi incidunt, dolore suscipit dolorum repellendus mollitia totam! Impedit, provident doloribus?
      </p>
      <Image src={process.env.PUBLIC_URL+"/img/jakob-owens-WUmb_eBrpjs-unsplash.jpg"} alt="image-1" />
    </Container>
   </div>
}

export default Dashboard;