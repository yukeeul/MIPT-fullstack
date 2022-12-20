function isEmail() {
    let var1 = document.getElementById("uniqueID1").value;
    let var2 = document.getElementById("uniqueID2").value;
    let var3 = document.getElementById("uniqueID3").value;
    let request = new XMLHttpRequest();
    url = "http://127.0.0.1:8000?var1=" + var1 + "&var2=" + var2 + "&var3=" + var3;
    request.open("GET", url);
    request.onreadystatechange = function () {
       if (request.readyState === 4) {
          console.log(request.responseText);
    }};
    request.send();
    
    //alert(request.responseText);
}
function f(request){
    console.log(request.response);
    console.log(request.responseText);
}