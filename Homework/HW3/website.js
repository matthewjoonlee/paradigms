document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("show-email-btn");
    const alertBox = document.getElementById("email-alert");
    const danceBtn = document.getElementById("dance-btn");
    const dog = document.getElementById("dog-emoji");

    if (button && alertBox) {
        button.addEventListener("click", function () {
            alertBox.textContent = "Email: mlee55@nd.edu";
            alertBox.classList.remove("d-none");
        });
    }

    if (danceBtn && dog) {
        danceBtn.addEventListener("click", function () {
            dog.classList.remove("d-none");
        });
    }
});
