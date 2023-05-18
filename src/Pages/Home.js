import Footer from "../Components/Footer"
import Header from "../Components/Header"
import TypingBox from "../Components/TypingBox"


const Home = () => {
  return (
    <div className="home">
        <div className="canvas">
        <Header />
        <TypingBox />
        <Footer />
      </div>
    </div>
  )
}

export default Home