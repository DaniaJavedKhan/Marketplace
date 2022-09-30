
import Link from 'next/link'

function ExploreNav() {
  return (
    <div className='ExploreNavbar'>
      <nav className="navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link  href="/Explore">
            <a className="nav-link active" aria-current="page">All NFTs</a>
          </Link>
        </li>

      </ul>

    </div>
  </div>
</nav>
      
    </div>
  )
}

export default ExploreNav