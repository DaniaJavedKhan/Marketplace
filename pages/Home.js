import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";


const Home = () => {
    const openInTab = url => {
        window.open(url, '_self', 'noopener,noreferrer');
      };
    return (
        
<div>
    <Navbar />
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
        <img src="photo-1499781350541-7783f6c6a0c8.jpeg" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
        <img src="wall-art-mural-painting.jpg" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
        <img src="abc.jpg" class="d-block w-100" alt="..." />
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>

    <div class="btndiv">
    <button type="button" class="btn btn-primary btn-lg" onClick={() => openInTab('/Explore')}>Explore</button>
    <button type="button" class="btn btn-secondary btn-lg" onClick={() => openInTab('/Create_Collection')}>Create</button>
    </div>


<Footer />
</div>
      );
}

export default Home;
