document.addEventListener("DOMContentLoaded", function () {
  const passwordBtn = document.querySelector("#show");
  const passwordInput = document.querySelector("#password");

  document.querySelector(".content__help").addEventListener("click", (e) => {
    e.preventDefault();
  });

  // Show / Hide password
  passwordBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // reset type of input field and label of switch button
    if (passwordInput.type === "text") {
      setPasswordVisible('password', 'show')
    } else {
      setPasswordVisible('text', 'hide')
    }

  });

  function setPasswordVisible(type, state) {
    passwordInput.type = type;
    passwordBtn.textContent = state;
    passwordInput.focus()
  }

  // Form validation
  const form = document.querySelector("#form");
  const successLabel = document.querySelector(".content__success");

  formValidate("#form", () => {
    successLabel.style.display = "flex";
    setTimeout(() => (successLabel.style.display = "none"), 3000);
  })

  function formValidate(formSelector, callback) {
      const $form = document.querySelector(formSelector);

      if ($form) {
        $form.addEventListener("submit", e => {
          e.preventDefault();
          successLabel.style.display = "none"

          // Validate form
          validation();
          // Check whether all inputs are valid and execute callback
          isThereError(callback);

          // Validate form on it's changing          
          $form.addEventListener("change", e => {
            if ( e.target.id !== 'password' ) validation()
          })
        });

      } else {
        throw new Error(formSelector + " is not a valid DOM element!");
      }

      function validation() {
        //   Validating each input inside of a form
        const inputs = $form.querySelectorAll("input");
        inputs.forEach((input) => {
          const inputValue = input.value.trim();

          if (input.id === "name") {
            if (inputValue === "" || inputValue.length <= 1) {
              setErrorFor(
                input,
                "Name field should contain at least 2 letters!"
              );
            } else {
              setSuccessFor(input);
            }
          } else if (input.id === "email") {
            if (inputValue === "") {
              setErrorFor(input, "Email field is empty!");
            } else if (!isEmailValid(inputValue)) {
              setErrorFor(input, "Email is not valid!");
            } else {
              setSuccessFor(input);
            }
          } else if (input.id === "password") {
            if (inputValue === "") {
              setErrorFor(input, "Password field is empty!");
            } else if (!isPasswordValid(inputValue)) {
              setErrorFor(
                input,
                "Password should contain 8 letters, one number, onu upper and lower case char!"
              );
            } else {
              setSuccessFor(input);
            }
          }
        });

        
      }

      function isThereError(callback) {
          //   If there are validation errors
        const error = $form.querySelector(".content__field_error");

        if (!error) {
          cleanInputs();
          callback();
        } else {
          //   Focus not valid input
          error.querySelector("input").focus();
        }
      }

      function setErrorFor(element, message) {
        const field = element.closest(".content__field");
        field.classList.add("content__field_error");
        field.querySelector(".content__error").textContent = message;
      }

      function setSuccessFor(element) {
        const field = element.closest(".content__field");
        field.classList.remove("content__field_error");
        field.querySelector(".content__error").textContent = "";
      }

      function isEmailValid(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        );
      }

      function isPasswordValid(password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
      }

      function cleanInputs() {
        form.querySelectorAll("input").forEach((input) => (input.value = ""));
      }
  }
});
