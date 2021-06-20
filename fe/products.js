
var mainSearchBar = document.getElementsByClassName("searchTerm");
var mainSearchButton = document.getElementsByClassName("searchButton");
mainSearchBar.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { //13 = enter
      event.preventDefault();
      document.getElementsByClassName("searchButton").click();
    }
  });
  mainSearchButton.onclick = function(searchString){
      fetch ('http://localhost:8095/be/api/searchPerfumes/'+searchString,{method: 'GET'}).then (response =>{

if (response.status===400 || response.status ===404)
window.location.href = './notFound.html';
return response.json();
      }).then(data=>
          {
              console.log(data);
              //populate lists
          }
      );
  };
  