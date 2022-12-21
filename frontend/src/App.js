import './App.css';
import Login from './Login';


import { useState} from 'react';

function setToken(userToken) {
  alert('setToken');
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return tokenString;
}


function App() {
  const token = getToken();
  //const token = getToken();
  const [answer, setAnswer] = useState([]);
  const [var1, setVar1] = useState('');
  const [var2, setVar2] = useState('');
  const [var3, setVar3] = useState('');
  
  if(!token) {
    return <Login setToken={setToken} />
  }

  const getApiData = async () => {
      const response = await fetch(
        "http://158.160.54.112:8000?var1=" + var1 + "&var2=" + var2 + "&var3=" + var3
      ).then((response) => response.json());


      let arr = []
      let temp = Array.from(response.ans);
      for (let i = 0; i < temp.length; i++) {
        arr.push([temp[i].city_from, temp[i].city_to, temp[i].departure_date, temp[i].arrival_date, temp[i].price]);
      }
      setAnswer(arr);
      console.log(arr);
      console.log(typeof arr);
  };
   
  const handleChange1 = (event) => {
    setVar1(event.target.value);
  };
  const handleChange2 = (event) => {
    setVar2(event.target.value);
  };
  const handleChange3 = (event) => {
    setVar3(event.target.value);
  };
  
  const handleSearchClick = () => {
    getApiData();
  };
  
  const handleBuyClick = (e) => {
    let id = e.target.id;
    alert(e.target.id);
  }


  return (
  <>
    <div id="top-div">
      <div id="top-inner-div">
          <input type="text" id="uniqueID2" onChange={handleChange1} value={var1} placeholder="Откуда"/>
          <input type="text" id="uniqueID2" onChange={handleChange2} value={var2} placeholder="Куда"/>
          <input type="text" id="uniqueID3" onChange={handleChange3} value={var3} placeholder="ГГГГ-ММ-ДД"/>
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
            <div className="text-div"> <button id={index} onClick={handleBuyClick}> temp text </button> </div>
          </div>
        ))}

    </div>
  </>
  );
}

export default App;
