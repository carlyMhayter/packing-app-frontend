import BrickGridBackground from "../animations/brickGrid/BrickGridBackground";
import logoText from "../../assets/text_&_logo.png";
import TripCards from "./TripCards";
import TextRoulette from "./TextRoulette";
import WeatherOverview from "./WeatherOverview";
import EllipticalItems from "./EllipticalItems";

export default function Homepage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <BrickGridBackground />
        <div className="home-content">
          <img src={logoText} alt="Platypak" className="home-logo" />
          <p>Packing as unique as you are!</p>
        </div>
      </section>

      <section className="home-section home-section-40">
        <EllipticalItems />
        <p className="home-tagline">
          We plan for every part of every trip, <br /> for all members of your
          travel party
          <br />
        </p>
      </section>
      <section className="home-section home-section-80">
        <div className="home-section-content">
          <p className="home-section-text">
            Tell us where you're going and for how long...
          </p>
          <TripCards />
          <WeatherOverview />
        </div>
      </section>

      <section className="home-section home-section-50">
        <div className="hero-roulette">
          <span className="hero-roulette-label">Tell us:</span>
          <TextRoulette />
        </div>
      </section>
    </div>
  );
}
