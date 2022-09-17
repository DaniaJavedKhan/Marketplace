import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Head from 'next/head';
import Home from './Home';






const Index = () => {


  return (
    <>
     <Head>
      <title>MarketPlace</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous" />

    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    
    

    </Head>
    
<Navbar />
<Home />
     <Footer />
    </>
  )
}

export default Index;

