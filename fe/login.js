function postObject(object){
    fetch('http://localhost:8095/be/api/login',{
        method:'POST',
        body:JSON.stringify(object) 
    }).then(resp => {
        if(resp.status === 400){
            window.location.href = '../login.html';
            alert("Password or Username wrong!");
        }
        return resp.json();
    }).then(data => {
        localStorage.setItem('email',data.email);
        localStorage.setItem('username',data.username);
        window.location.href = '../index.html';
    });
}

function main(){
    if(localStorage.getItem('email') !== null){
        window.location.href = '../index.html';
    }
    let usr = document.getElementById('usr');
    let pass = document.getElementById('pass');
    let log = document.getElementById('log');
    log.addEventListener('click',()=>{
        let obj = {};
        obj.username = usr.value;
        obj.password = pass.value;
        postObject(obj);
    });
}

main();