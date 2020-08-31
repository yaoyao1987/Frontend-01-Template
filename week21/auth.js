{
  let client_secret = "d3f705acc607a65a5aafde930ddf73ca474dbcb6";
  let client_id = "Iv1.6e42db42b93ab770";
  let redirect_uri = encodeURIComponent("http://localhost:8000");
  let url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=abc123`;
}

{
  let code = "855a70ca25db79f1ccf5";
  let state = "abc123";
  let client_secret = "d3f705acc607a65a5aafde930ddf73ca474dbcb6";
  let client_id = "Iv1.6e42db42b93ab770";
  let redirect_uri = encodeURIComponent("http://localhost:8000");

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  let xhr = new XMLHttpRequest();

  xhr.open(
    "POST",
    `https://github.com/login/oauth/access_token?${params}`,
    true
  );
  // xhr.setRequestHeader("Authorization", "token");
  xhr.send(null);

  xhr.addEventListener("readystatechange", function(event) {
    if (this.readyState === 4) {
      console.log(xhr.responseText);
    }
  });
}

{
  let xhr = new XMLHttpRequest();

  xhr.open("GET", `https://api.github.com/user`, true);
  xhr.setRequestHeader("Authorization", "token 7f1b346981c6de34807c7152200b557b43505a7a");
  xhr.send(null);

  xhr.addEventListener("readystatechange", function(event) {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
    }
  });
}
