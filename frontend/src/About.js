import './About.css';

import { useNavigate } from "react-router-dom";
function LoginLayout() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  }
}
  

function About() {
  return (
  <>
    <a href = {window.location.host + "/"}>  текст</a>
    <div id="padding-div">
        <h1> Сайт сделан для курса по full-stack разработке </h1>
        <h1> Github: <a href="https://github.com/yukeeul/MIPT-fullstack"> https://github.com/yukeeul/MIPT-fullstack </a> </h1>
        <h1> МФТИ 2022</h1>
    </div>
  </>
  );
}

export default About;
