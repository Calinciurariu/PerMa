function checkIfLogged() {
  localStorage.clear;
  if (localStorage.getItem("email") !== null) {
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    console.log(localStorage.getItem("isAdmin"));
    if (localStorage.getItem("isAdmin") === "false") {
      document.getElementById("admin").style.display = "none";
    }
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "./login.html";
    });
  } else {
    document.getElementById("wish").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("admin").style.display = "none";
  }
}

function downloadTxt(file, text, format) {
  let element = document.createElement("a");
  if (format === "txt") {
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8, " + encodeURIComponent(text)
    );
  }else{
      element.setAttribute(
        "href",
        "data:csv;charset=utf-8, " + encodeURIComponent(text)
      );
  }
  element.setAttribute("download", file);

  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function main() {
  checkIfLogged();
  // let slices = window.location.href.split("/");
  // if (slices[3] === "admin.html") {
  //   let txtBtn = document.getElementById("txt");
  //   txtBtn.addEventListener("click", () => {
  //     fetch("http://localhost:8095/be/api/stats/txt")
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         let content = JSON.stringify(data);
  //         let fname = "GFG.txt";
  //         downloadTxt(fname, content, "txt");
  //       });
  //   });
  //   let csvBtn = document.getElementById("csv");
  //   csvBtn.addEventListener("click", () => {
  //     fetch("http://localhost:8095/be/api/stats/csv")
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         let content = data.data;
  //         let fname = "GFG.csv";
  //         downloadTxt(fname, content, "csv");
  //       });
  //   });
  // }
}

main();
