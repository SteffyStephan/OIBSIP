const sessionUser = JSON.parse(localStorage.getItem("sessionUser"));

if (!sessionUser) {
    window.location.href = "index.html";
}

const welcomeText = document.getElementById("welcomeText");

welcomeText.textContent = `Welcome, ${sessionUser.username}!`;

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("sessionUser");
    window.location.href = "index.html";
});