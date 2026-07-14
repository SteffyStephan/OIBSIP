const sessionUser = JSON.parse(localStorage.getItem("sessionUser"));

if (sessionUser) {
    window.location.href = "dashboard.html";
}

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const loginUser = document.getElementById("loginUser").value.trim().toLowerCase();
    const loginPassword = document.getElementById("loginPassword").value;

    loginError.textContent = "";

    // Basic validation
    if (!loginUser || !loginPassword) {
        loginError.textContent = "Please fill in all fields.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by username OR email
    const user = users.find(
        user =>
            user.username.toLowerCase() === loginUser ||
            user.email.toLowerCase() === loginUser
    );

    if (!user) {
        loginError.textContent = "Invalid username/email or password.";
        return;
    }

    const hashedPassword = await hashPassword(loginPassword);

    if (user.password !== hashedPassword) {
        loginError.textContent = "Invalid username/email or password.";
        return;
    }

    // Create session
    localStorage.setItem("sessionUser", JSON.stringify(user));

    window.location.href = "dashboard.html";
});

const loginPasswordInput = document.getElementById("loginPassword");
const toggleLoginPassword = document.getElementById("toggleLoginPassword");

toggleLoginPassword.addEventListener("click", () => {
    if (loginPasswordInput.type === "password") {
        loginPasswordInput.type = "text";
        toggleLoginPassword.textContent = "🙈";
    } else {
        loginPasswordInput.type = "password";
        toggleLoginPassword.textContent = "👁";
    }
});