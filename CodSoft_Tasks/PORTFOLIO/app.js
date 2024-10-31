
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector(".contact-form");
        const confirmationMessage = document.getElementById("confirmation-message");

        form.addEventListener("submit", function (event) {
            event.preventDefault(); 

            
            confirmationMessage.textContent = "Message sent successfully! We'll get back to you soon.";
            confirmationMessage.style.display = "block";

            form.reset();
        });
    });

