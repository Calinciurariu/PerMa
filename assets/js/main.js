

$('.heart-container').on('click', (e) => {
    $('.heart').toggleClass('beat');
});     


// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("nav");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {


    navbar.classList.add("sticky");
	navbar.id="";
  } else {
    navbar.classList.remove("sticky");
	navbar.id="nav";

  }
 }
