import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import Logo from "../components/Logo";
function Home() {
  return (
    <>
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              Odometer
              <span> Insight </span>
            </h1>

            <p>
            2022 ZJU Software Requirements Engineering Project
            </p>
            
         
            <Link to="/login" className="btn btn-hero">
              Login / Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </>
  );
}

export default Home;
