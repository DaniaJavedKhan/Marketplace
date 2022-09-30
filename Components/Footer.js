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
          <Link href='https://www.facebook.com/profile.php?id=100031125340477'>
          <a className='me-4 text-reset' target='_blank'>
          <img src="facebook-f (1).svg" alt="" width="35" height="35" />
          </a>
          </Link>

          <Link href="mailto:djaved034@gmail.com">
          <a className='me-4 text-reset' target='_blank'>
          <img src="gmail.png" alt="" width="32" height="32" />
          </a>
          </Link>

          <Link href='https://www.instagram.com/dania_javed_khan/'>
          <a className='me-4 text-reset' target='_blank'>
          <img src="Instagram.svg.png" alt="" width="35" height="35" />
          </a>
          </Link>

          <Link href='https://www.linkedin.com/in/dania-javed-a706b1245/'>
          <a className='me-4 text-reset' target='_blank'>
          <img src="linkedin (1).svg" alt="" width="35" height="35" />
          </a>
          </Link>

          <Link href='https://github.com/DaniaJavedKhan'>
          <a className='me-4 text-reset' target='_blank'>
          <img src="github (1).svg" alt="" width="35" height="35" />
          </a>
          </Link>
        </div>
      </section>
    </MDBFooter>
  );
}