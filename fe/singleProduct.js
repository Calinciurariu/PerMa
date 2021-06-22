var productID = ""
function mainf()
{
    productID = localStorage.getItem('quizPerfume');
   if (productID === '')
      productID = "60ce6482a129c9496ce5462b";
    fetch ('http://localhost:8095/be/api/perfume/'+productID,{method: 'GET'}).then (response =>{

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
        var temp = document.getElementById("tmplt");
        var clone = temp.content.cloneNode(true);
        var b = clone.querySelectorAll("b");
b[0].innerText = data.price+ " €";
var bh = clone.querySelectorAll("h3");
bh[0].innerText = data.designer + '-' + data.name;
var ih = clone.querySelectorAll("img");
ih[0].src = data.picture;
        docs[0].appendChild(clone);
});}
mainf();