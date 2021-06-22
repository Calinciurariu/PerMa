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
        document.getElementById("number1").innerText+= CustomersList.length;

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
        document.getElementById("number2").innerText+= ProductsList.length;

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
        document.getElementById("number3").innerText+= ShipmentsList.length;
        document.getElementById("number4").innerText+= Math.floor(ShipmentsList.length/2) ;

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
  //  console.log("went up");
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function DownloadPDF() {
   
    fetch('http://localhost:8095/be/api/stats/csv',{
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

        saveTextAsFilePDF(data);

    });
  }
  function DownloadCSV() {
    fetch('http://localhost:8095/be/api/stats/csv',{
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
        saveTextAsFileCSV(data);

    });
   
  }

  function saveTextAsFileCSV(textToWrite)
{
	var textFileAsBlob = new Blob([textToWrite], {type:'text/csv'});

	var downloadLink = document.createElement("a");
	downloadLink.download = "report.csv";
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function saveTextAsFilePDF(textToWrite)
{
	// var textFileAsBlob = new Blob([textToWrite], {type:'application/pdf'});

	// var downloadLink = document.createElement("b");
	// downloadLink.download = "report.pdf";
	// downloadLink.innerHTML = "Download File";
	// if (window.webkitURL != null)
	// {
	// 	// Chrome allows the link to be clicked
	// 	// without actually adding it to the DOM.
	// 	downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	// }
	// else
	// {
	// 	// Firefox requires the link to be added to the DOM
	// 	// before it can be clicked.
	// 	downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	// 	downloadLink.onclick = destroyClickedElement;
	// 	downloadLink.style.display = "none";
	// 	document.body.appendChild(downloadLink);
	// }

	// downloadLink.click();
    var byteNumbers = new Array(textToWrite.length);
for (var i = 0; i < textToWrite.length; i++) {
  byteNumbers[i] = textToWrite.charCodeAt(i);
}
var byteArray = new Uint8Array(byteNumbers);
var file = new Blob([byteArray], { type: 'application/pdf;base64' });
var fileURL = URL.createObjectURL(file);
window.open(fileURL);
}