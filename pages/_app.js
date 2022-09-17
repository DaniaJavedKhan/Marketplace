import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "./CssFile.css";
import "./index.css";
import "../styles/Home.module.css";


function MyApp({ Component, pageProps }) {

 return(
 <>
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous"></script>
     
     <Component {...pageProps} />
     
 </> 

 ) 
}

export default MyApp
