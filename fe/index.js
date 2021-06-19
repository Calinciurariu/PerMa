function checkIfLogged(){
    localStorage.clear
    if(localStorage.getItem('email') !== null){
          document.getElementById('login').style.display = 'none';
          document.getElementById('register').style.display = 'none';
          document.getElementById('logout').addEventListener('click',()=>{
              localStorage.clear();
              window.location.href = '../login.html';
          });
    }else{
        document.getElementById('wish').style.display = 'none';
        document.getElementById('profile').style.display = 'none';
        document.getElementById('logout').style.display = 'none';
    }
}

function main(){
    checkIfLogged();
}

main();