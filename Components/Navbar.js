import Link from 'next/link';
import Script from 'next/script';


const Navbar = () => {
       
  return (
    <>
    

      <nav className="navbar navbar-expand-lg navbar-light fixed-nav-bar">
  <div className="container-fluid">
    <a className="navbar-brand">
    <img src="/Neftors.jpg" alt="" width="150" height="50" />
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

        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Explore
            </a>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link href="/Explore"><a className="dropdown-item">All NFTs</a></Link>
            <hr className="dropdown-divider"></hr>
            <Link href="/Art"><a className="dropdown-item">Art</a></Link>
            <hr className="dropdown-divider"></hr>
            <Link href="/Music"><a className="dropdown-item">Music</a></Link>
            <hr className="dropdown-divider"></hr>
            <Link href="/Videos"><a className="dropdown-item">Videos</a></Link>
            <hr className="dropdown-divider"></hr>
            <Link href="/Virtual_Worlds"><a className="dropdown-item">Virtual Worlds</a></Link></li>
        </ul>
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
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-success" type="submit">Search</button>
      </form>

    </div>
  </div>
</nav>


    </>
    
  )
  
}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous"></script>


export default Navbar;

