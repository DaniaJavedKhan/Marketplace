import Link from 'next/link';
import Script from 'next/script';


const Navbar = () => {
       
  return (
    <>
    

      <nav className="navbar navbar-expand-lg navbar-light fixed-nav-bar">
  <div className="container-fluid">
    <a className="navbar-brand">
    <img src="/fineNFTs.jpg" alt="" width="200" height="65" />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link  href="/">
            <a className="nav-link" aria-current="page">Home</a>
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/Explore">
            <a className="nav-link">Explore</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/Dashboard">
            <a className="nav-link">Dashboard</a>
          </Link>
        </li>

        <li className="nav-item dropdown">
          <Link href="/">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Collection
            </a>
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link href="/Create_Collection"><a className="dropdown-item">Create Collection</a></Link></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><Link href="/My_Collection"><a className="dropdown-item">My Collection</a></Link></li>
        </ul>
        </li>
        <li className="nav-item">
        <Link href="/Wallat">
            <a className="navbar-brand">
            <img src="/user-solid.svg" alt="" width="30" height="30" />
            </a>
          </Link>
        </li>
      </ul>

    </div>
  </div>
</nav>


    </>
    
  )
  
}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous"></script>


export default Navbar;

