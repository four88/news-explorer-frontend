import "./About.css";
import aboutImg from "../../images/about.JPG";
export default function About() {
  return (
    <section className="about">
      <img className="about__img" alt="about" src={aboutImg} />
      <div className="about__container">
        <h1 className="about__heading">About the author</h1>
        <p className="about__content">
          Hi, my name is Pharanyu Chuenjit and I am a full stack web developer.
          I am particularly skilled in the MERN stack (MongoDB, Express, React,
          and Node.js). My background is in STEM, and I have a Master's degree
          in computer science as well as a Bachelor's degree in industrial
          design. I am currently participating in a 10-month software
          engineering bootcamp with Practicum by Yandex as part of my
          professional development. I really enjoy learning new things and am
          always looking to improve my skills.
        </p>
      </div>
    </section>
  );
}
