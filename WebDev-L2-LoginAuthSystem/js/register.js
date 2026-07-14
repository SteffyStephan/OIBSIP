const sessionUser = JSON.parse(localStorage.getItem("sessionUser"));

if (sessionUser) {
    window.location.href = "dashboard.html";
}

const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("registerError");

registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    registerError.textContent = "";

    // Empty validation
    if (!username || !email || !password || !confirmPassword) {
        registerError.textContent = "Please fill in all fields.";
        return;
    }

    // Password validation
    const passwordRegex = /^(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
        registerError.textContent =
            "Password must be at least 8 characters and contain at least one number.";
        return;
    }

    if (password !== confirmPassword) {
        registerError.textContent = "Passwords do not match.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user =>
        user.username === username ||
        user.email === email
    );

    if (userExists) {
        registerError.textContent =
            "Username or email already exists.";
        return;
    }

    const hashedPassword = await hashPassword(password);

    users.push({
        username,
        email,
        password: hashedPassword
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    window.location.href = "index.html";
});

const passwordInput = document.getElementById("password");
const toggleRegisterPassword = document.getElementById("toggleRegisterPassword");

toggleRegisterPassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleRegisterPassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        toggleRegisterPassword.textContent = "👁";
    }
});