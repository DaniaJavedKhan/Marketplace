
import Link from 'next/link'

function VideosNav() {
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
        <li className="nav-item">
          <Link href="/Art">
            <a className="nav-link">Art</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/Music">
            <a className="nav-link">Music</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/Videos">
            <a className="nav-link">Videos</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/Virtual_Worlds">
            <a className="nav-link">Virtual Worlds</a>
          </Link>
        </li>

      </ul>

    </div>
  </div>
</nav>
      
    </div>
  )
}

export default VideosNav