function checkIfLogged() {
  localStorage.clear;
  if (localStorage.getItem("email") !== null) {
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    console.log(localStorage.getItem("isAdmin"));
    if (localStorage.getItem("isAdmin") === "false") {
      document.getElementById("admin").style.display = "none";
    }
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "./login.html";
    });
  } else {
    document.getElementById("wish").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("admin").style.display = "none";
  }
}

function downloadTxt(file, text, format) {
  let element = document.createElement("a");
  if (format === "txt") {
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8, " + encodeURIComponent(text)
    );
  }else{
      element.setAttribute(
        "href",
        "data:csv;charset=utf-8, " + encodeURIComponent(text)
      );
  }
  element.setAttribute("download", file);

  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function main() {
  checkIfLogged();
  if (window.location.href === './singleProduct.html')
  {
  fetch ('http://localhost:8095/be/api/newest',{method: 'GET'}).then (response =>{

        if (response.status===400 || response.status ===404)
        window.location.href = './notFound.html';
        return response.json();
              }).then(data=>
                  {
var p1 = document.getElementById("p1price");
p1.innerText = data[0].price+ " €";
 p1 = document.getElementById("p1name");
p1.innerText = data[0].designer+ " - "+data[0].name;
var p1 = document.getElementById("p1pic");
p1.src = data[0].picture;
p1.onclick = function() { 
  GoToProduct(data[0]._id)}
var p2 = document.getElementById("p2price");
p2.innerText = data[1].price+ " €";
 p2 = document.getElementById("p2name");
 p2.innerText = data[1].designer+ " - "+data[1].name;
var p2 = document.getElementById("p2pic");
p2.src = data[1].picture;
p2.onclick = function() { 
  GoToProduct(data[1]._id)}
var p3 = document.getElementById("p3price");
p3.innerText = data[2].price+ " €";
p3 = document.getElementById("p3name");
p3.innerText = data[2].designer+ " - "+data[2].name;
var p3 = document.getElementById("p3pic");
p3.src = data[2].picture;

p3.onclick = function() { 
  GoToProduct(data[2]._id)
}
}
);}
}
function GoToProduct(idString)
{

  if (idString!==null)
  {
  localStorage.setItem('quizPerfume',idString);
 window.location.href = './singleProduct.html';
  }
}
main();
