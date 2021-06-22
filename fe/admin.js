var CustomersList= [];
var ProductsList = [];
var ShipmentsList= [];

var counter= 0;


window.onload = function() {
    loadReport();
  };

  function loadReport(){
    fetch('http://localhost:8095/be/api/users',{
        method:'GET',
    }).then(resp => {
        if(resp.status === 400)
        {
            window.location.href = './BadRequest.html';
        }
        else if (resp.status === 404)
        {
            window.location.href = './notFound.html';
        }
        return resp.json();
    }).then(data => {
        localStorage.setItem('customers',data);
        CustomersList= data;
        PopulateUsers();
        document.getElementById("customersnr").innerText+= "How many customers are on Perfume Shop: "+CustomersList.length;

    });

    fetch('http://localhost:8095/be/api/perfumes',{
        method:'GET',
    }).then(resp => {
        if(resp.status === 400)
        {
            window.location.href = './BadRequest.html';
        }
        else if (resp.status === 404)
        {
            window.location.href = './notFound.html';
        }
        return resp.json();
    }).then(data => {
        ProductsList= data;
        localStorage.setItem('products',data);
        PopulateProducts();

     //   localStorage.setItem('shipments',data);
    });
    
    fetch('http://localhost:8095/be/api/shipments',{
        method:'GET',
    }).then(resp => {
        if(resp.status === 400)
        {
            window.location.href = './BadRequest.html';
        }
        else if (resp.status === 404)
        {
            window.location.href = './notFound.html';
        }
        return resp.json();
    }).then(data => {
        ShipmentsList= data;
        localStorage.setItem('shipments',data);
        PopulateShipments();

    });
  }

  function PopulateUsers()
  {
    var List1= document.getElementById("customerslist");

    CustomersList.forEach(element => {
        List1.innerHTML  += "<li>User id: " + element._id +'<br/> email: '+element.email+'<br/> is Admin?: '+element.isAdmin +"</li>";

});
  }
  function PopulateProducts()
  {
    var List2= document.getElementById("perfumeslist");

    ProductsList.forEach(element => {
        List2.innerHTML += "<li>Item id: " + element._id +'<br/> price: '+element.price+'<br/> popularity: '+element.popularity + '<br/>'+element.stockAvaliability+"</li>";

});
  }

  function PopulateShipments()
  {
      var color = "grey";
    var List3= document.getElementById("shippingslist");
console.log()
ShipmentsList.forEach(element => {
    switch(element.status) {
        case "Accepted":
            color="green";
       break;
        case "Delivering":
            color="gold";

          break;
          case "Not yet dispatched":
            color="orange";

          break;
        default:
            color="grey";

      }
        List3.innerHTML += "<li>Shipment id: " + element._id +'<br/> shipped to  '+element.shipmentsUsername+'<br/> is \n in status: <p style="color:'+color+'">'+element.status + "</p></li>";

});
  }


var mybutton = document.getElementById("topButton");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 35 || document.documentElement.scrollTop > 35) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}