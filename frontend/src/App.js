import './App.css';
import Login from './Login';


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
  
  if(!token || JSON.parse(token).token === "INCORRECT") {
    return <Login setToken={setToken} />
  }
  token = JSON.parse(token).token;
  
  const getApiData = async () => {
      let var1 = document.getElementById('input1').value;
      let var2 = document.getElementById('input2').value;
      let var3 = document.getElementById('input3').value;
      const response = await fetch(
        "http://158.160.54.112:8000?var1=" + var1 + "&var2=" + var2 + "&var3=" + var3
      ).then((response) => response.json());


      let arr = []
      let temp = Array.from(response.ans);
      for (let i = 0; i < temp.length; i++) {
        arr.push([temp[i].city_from, temp[i].city_to, temp[i].departure_date, temp[i].arrival_date, temp[i].price, temp[i].id]);
      }
      setAnswer(arr);
      console.log(arr);
      console.log(typeof arr);
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
    alert(result.status);
    
  }


  return (
  <>
    <div id="top-div">
      <div id="top-inner-div">
          <input type="text" id="input1"  placeholder="Откуда"/>
          <input type="text" id="input2"  placeholder="Куда"/>
          <input type="text" id="input3"  placeholder="ГГГГ-ММ-ДД"/>
          <button id="find-button" onClick={handleSearchClick}> Нажми на меня</button>
      </div>
    </div >
    
    <div id="main-div">  
        {answer.map((flight, index) => (
          <div key={index} className="flight-container">
            <div className="text-div"> <p> {flight[0]} </p> </div>
            <div className="text-div"> <p> {flight[1]} </p> </div>
            <div className="text-div"> <p> {flight[2]} </p> </div>
            <div className="text-div"> <p> {flight[3]} </p> </div>
            <div className="text-div"> <p> {flight[4]} </p> </div>
            <div className="text-div"> <button id={flight[5]} onClick={handleBuyClick}> temp text </button> </div>
          </div>
        ))}

    </div>
  </>
  );
}

export default App;
