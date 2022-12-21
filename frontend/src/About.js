import './About.css';

import { useNavigate } from "react-router-dom";
  

function About() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/');
  };

  return (
  <>
    <p id="return-text" onClick={navigateHome}> На главную </p>
    <div id="padding-div">
        <h1 className="about-text"> Сайт сделан для курса по full-stack разработке </h1>
        <h1 className="about-text"> Github: <a href="https://github.com/yukeeul/MIPT-fullstack"> https://github.com/yukeeul/MIPT-fullstack </a> </h1>
        <h1 className="about-text"> МФТИ 2022</h1>
    </div>
  </>
  );
}

export default About;
