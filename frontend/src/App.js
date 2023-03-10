import './App.css';
import Login from './Login';

import { useNavigate } from "react-router-dom";
import { useState} from 'react';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return tokenString;
}

async function buyTicket(credentials) {
 return fetch('http://158.160.54.112:8000/buy/', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}



function App() {
  let token = getToken();
  const [answer, setAnswer] = useState([]);
  const navigate = useNavigate();
  const navigateToAbout = () => {
    navigate('/about');
  };
  
  
  if(!token || JSON.parse(token).token === "INCORRECT") {
    return <Login setToken={setToken} />
  }
  token = JSON.parse(token).token;
  
  
  const getApiData = async () => {
      let city_from = document.getElementById('input1').value;
      let city_to = document.getElementById('input2').value;
      let date = document.getElementById('input3').value;
      const response = await fetch(
        "http://158.160.54.112:8000/flights/?var1=" + city_from + "&var2=" + city_to + "&var3=" + date
      ).then((response) => response.json());


      let arr = []
      let temp = Array.from(response.ans);
      for (let i = 0; i < temp.length; i++) {
        arr.push([temp[i].city_from, temp[i].city_to, temp[i].departure_date.substr(11, 5), temp[i].arrival_date.substr(11, 5), temp[i].price + " руб", temp[i].id]);
      }
      setAnswer(arr);
  };
  
  const handleSearchClick = () => {
    getApiData();
  };
  
  const handleBuyClick = async (e) => {
    let id = e.target.id;
    e.preventDefault();
    const result = await buyTicket({
      token,
      id
    });
    let button = document.getElementById(id);
    if (result.status === "COMPLETED"){
        button.style.setProperty('background-color', "#7FFF00");
    }
  }
  
  
  return (
  <>
    <div id="top-div">
      <h1 id="title"> GetTicket </h1>
      <h3 onClick={navigateToAbout}> О проекте </h3>
      <div id="top-inner-div">
          <input type="text" id="input1"  placeholder="Откуда"/>
          <input type="text" id="input2"  placeholder="Куда"/>
          <input type="text" id="input3"  placeholder="ГГГГ-ММ-ДД"/>
          <button id="find-button" onClick={handleSearchClick}> Найти билеты</button>
      </div>
    </div >
    
    <div id="main-div"> 
        {answer.length > 0? 
         <div  id="first-flight-container">
            <div className="text-div1"> <p className ="flight-text"> Откуда </p> </div>
            <div className="text-div5"> <p className ="flight-text"> Куда </p> </div>
            <div className="text-div2"> <p className ="flight-text"> Отправление </p> </div>
            <div className="text-div3"> <p className ="flight-text"> Прибытие </p> </div>
            <div className="text-div4"> <p className ="flight-text"> Цена </p> </div>
            <div className="text-div6"> <p className ="flight-text" > Купить </p> </div>
         </div>
        : null } 
        {answer.map((flight, index) => (
          <div key={index} className="flight-container">
            <div className="text-div"> <p className ="flight-text"> {flight[0]} </p> </div>
            <div className="text-div"> <p className ="flight-text"> {flight[1]} </p> </div>
            <div className="text-div"> <p className ="flight-text"> {flight[2]} </p> </div>
            <div className="text-div"> <p className ="flight-text"> {flight[3]} </p> </div>
            <div className="text-div"> <p className ="flight-text"> {flight[4]} </p> </div>
            <div className="text-div"> <button className="buy-button" id={flight[5]} onClick={handleBuyClick}> Купить</button> </div>
          </div>
        ))}

    </div>
  </>
  );
}

export default App;
