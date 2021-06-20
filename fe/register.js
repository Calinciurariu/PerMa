function postUser(obj){
    fetch('http://localhost:8095/be/api/register',{
        method:'POST',
        body:JSON.stringify(obj)
    }).then(resp => {
        if(resp.status === 400){
            window.location.href = './register.html';
            alert('User already exists!');
        }
        return resp.json();
    }).then(data => {
        console.log(data);
        window.location.href = './login.html';
    });
}

function main(){
    if(localStorage.getItem('email') !== null){
        window.location.href = './index.html';
    }
    let lstName = document.getElementsByClassName('last-name')[0];
    let frstName = document.getElementsByClassName('first-name')[0];
    let birth = document.getElementsByClassName('birth')[0];
    let user = document.getElementsByClassName('username')[0];
    let email = document.getElementsByClassName('email')[0];
    let pass = document.getElementsByClassName('password')[0];
    let regBtn = document.getElementsByClassName('register')[0];

    regBtn.addEventListener('click',()=>{
        postUser({
            email:email.value,
            username:user.value,
            firstname:frstName.value,
            lastname:lstName.value,
            password:pass.value,
            birthdate:birth.value,
            isAdmin:false,
        });
    });
}


main();