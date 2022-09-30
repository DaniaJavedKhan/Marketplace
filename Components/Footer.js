import { MDBFooter, MDBIcon } from 'mdb-react-ui-kit';
import Link from 'next/link';

export default function Footer() {
  return (
    
    <MDBFooter className='text-center text-lg-start text-muted fixed-footer'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <Link href=''>
          <a className='me-4 text-reset'>
          <img src="facebook-f (1).svg" alt="" width="30" height="30" />
          </a>
          </Link>

          <Link href=''>
          <a className='me-4 text-reset'>
          <img src="twitter .svg" alt="" width="30" height="30" />
          </a>
          </Link>

          <Link href=''>
          <a className='me-4 text-reset'>
          <img src="Google.svg.png" alt="" width="30" height="30" />
          </a>
          </Link>

          <Link href=''>
          <a className='me-4 text-reset'>
          <img src="Instagram.svg.png" alt="" width="30" height="30" />
          </a>
          </Link>

          <Link href=''>
          <a className='me-4 text-reset'>
          <img src="linkedin (1).svg" alt="" width="30" height="30" />
          </a>
          </Link>

          <Link href=''>
          <a className='me-4 text-reset'>
          <img src="github (1).svg" alt="" width="30" height="30" />
          </a>
          </Link>
        </div>
      </section>
    </MDBFooter>
  );
}