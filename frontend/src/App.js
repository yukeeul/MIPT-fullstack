import './App.css';

import { useState} from 'react';


function App() {
  const [answer, setAnswer] = useState([]);
  const [var1, setVar1] = useState('');
  const [var2, setVar2] = useState('');
  const [var3, setVar3] = useState('');
  
  const getApiData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000?var1=" + var1 + "&var2=" + var2 + "&var3=" + var3
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
  
  const handleClick = () => {
    getApiData();
  };


  return (
  <>
    <div id="top-div">
      <div id="top-inner-div">
          <input type="text" id="uniqueID2" onChange={handleChange1} value={var1} placeholder="Откуда"/>
          <input type="text" id="uniqueID2" onChange={handleChange2} value={var2} placeholder="Куда"/>
          <input type="text" id="uniqueID3" onChange={handleChange3} value={var3} placeholder="ГГГГ-ММ-ДД"/>
          <button id="find-button" onClick={handleClick}> Нажми на меня</button>
      </div>
    </div >
    
    <div id="main-div">  
        {answer.map(flight => (
          <div id="flight-container">
            <div class="text-div"> <p> {flight[0]} </p> </div>
            <div class="text-div"> <p> {flight[1]} </p> </div>
            <div class="text-div"> <p> {flight[2]} </p> </div>
            <div class="text-div"> <p> {flight[3]} </p> </div>
            <div class="text-div"> <p> {flight[4]} </p> </div>
            <div class="text-div"> <p> temp text </p> </div>
          </div>
        ))}

    </div>
  </>
  );
}

export default App;
