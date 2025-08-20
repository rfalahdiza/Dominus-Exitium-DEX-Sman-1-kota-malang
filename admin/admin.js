// Login handling
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const articleForm = document.getElementById("articleForm");
  const articleList = document.getElementById("articleList");

  // Simulasi login
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if(username === "admin" && password === "1234") {
        window.location.href = "dashboard.html";
      } else {
        alert("Username atau password salah!");
      }
    });
  }

  // Tambah artikel
  if (articleForm) {
    articleForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;

      const li = document.createElement("li");
      li.innerHTML = `<b>${title}</b>: ${content}`;
      articleList.appendChild(li);

      articleForm.reset();
    });
  }
});
