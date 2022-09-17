import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import ArtNav from "../Components/ArtNav"





const Art = () => {
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
<ArtNav />

</div>

<Footer />
    
    </>
  )
}

export default Art
