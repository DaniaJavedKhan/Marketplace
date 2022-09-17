import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import VirtualNav from "../Components/VirtualNav"





const Virtual = () => {
  return (
<>
<Navbar />

      <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner-Ex">
        <div class="carousel-item active Ex">
        <img src="exploree.jpg" class="d-block w-100" alt="..." />
        </div>
    </div>

    </div>
<VirtualNav />

</div>

<Footer />
    
    </>
  )
}

export default Virtual
