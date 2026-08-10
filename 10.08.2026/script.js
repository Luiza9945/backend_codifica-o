const modal = document.getElementById('id01');


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const loginForm = document.querySelector('.modal-content');


loginForm.addEventListener('submit', function(event) {
  event.preventDefault();


  const usernameInput = document.querySelector('input[name="uname"]').value.trim();
  const passwordInput = document.querySelector('input[name="psw"]').value.trim();


  if (usernameInput === "" || passwordInput === "") {
    alert("Por favor, preencha todos os campos!");
    return;
  }


  if (usernameInput === "admin" && passwordInput === "1234") {
    alert("Login realizado com sucesso! Redirecionando...");
    this.submit();
  } else {
    alert("Usuário ou senha incorretos. Tente novamente.");
  }
});
