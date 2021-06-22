
var prodList = [];
var mainSearchBar = document.getElementsByClassName("searchTerm");
var mainSearchButton = document.getElementsByClassName("searchButton");
var searchString="";

mainSearchBar[0].addEventListener("keyup", function(event) {
    searchString = mainSearchBar[0].value ;
    if (event.keyCode === 13) { //13 = enter
      event.preventDefault();
      mainSearchButton[0].click(searchString);

    }
  });
  mainSearchButton[0].onclick = function(){
      console.log("search called "+searchString);
      fetch ('http://localhost:8095/be/api/searchPerfumes/'+searchString,{method: 'GET'}).then (response =>{

if (response.status===400 || response.status ===404)
window.location.href = './notFound.html';
return response.json();
      }).then(data=>
          {

            var docs = document.getElementsByClassName("toAppend");
//clearing the ul first
Array.from(docs).forEach((el) => {
    el.innerHTML ='';
});

              console.log(data);

              prodList = data;
              prodList.forEach(element => {
                var temp = document.getElementById("tmplt");
                var clone = temp.content.cloneNode(true);
                var b = clone.querySelectorAll("b");
b[0].innerText = element.price
                docs[0].appendChild(clone);
              });
           

          }
      );
  };
  