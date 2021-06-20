function updatePassowrd(object) {
  fetch("http://localhost:8095/be/api/updatePassword", {
    method: "PUT",
    body: JSON.stringify(object),
  })
    .then((resp) => {
      if (resp.status === 400) {
        alert("Email nout found!");
        window.location.href = "./forgot.html";
        return null;
      }
      return resp.json();
    })
    .then((data) => {
      if (data !== null) {
        window.location.href = "./login.html";
      }
    });
}

function main() {
  let mail = document.getElementById("mail");
  let pass = document.getElementById("pass");
  let chng = document.getElementById("chg");
  chng.addEventListener("click", () => {
    let obj = {
      where: {
        email: mail.value,
      },
      fields: {
        password: pass.value,
      },
    };
    updatePassowrd(obj);
  });
}

main();
