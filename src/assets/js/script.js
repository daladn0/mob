document.addEventListener("DOMContentLoaded", function () {
  // Modal window
  function modal({ heading = "FoxHub", modalWindow }) {
    const modal = document.querySelector(modalWindow);
    const close = modal.querySelector(".modal__close");
    const title = modal.querySelector(".modal__heading");

    // Setting content of modal window

    title.innerHTML = heading;

    // Opening and closing modal window

    function openModal(content) {
      if (content) {
        modal.querySelector(".modal__p").innerHTML = content;
      }
      modal.classList.add("modal_active");
      document.body.style.overflow = 'hidden'
    }

    function closeModal() {
      modal.classList.remove("modal_active");
      document.body.style.overflow = ''
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target === close) {
        closeModal();
      }
    });

    return {
      openModal,
      closeModal,
    };
  }

  const { openModal: openHelpModal, closeModal: closeHelpModal } = modal({
    heading: "Following frequently asked questions might help you!",
    modalWindow: ".modal_help",
  });

  const { openModal: openSuccessModal, closeModal: closeSuccessModal } = modal({
    heading: "Success!",
    modalWindow: ".modal_success",
  });

  const { openModal: openPasswordModal, closeModal: closePasswordModal } =
    modal({
      heading: "Reset password",
      modalWindow: ".modal_password",
    });

  // Setting modal open button
  const helpButton = document.querySelector(".content__help");
  const resetPassword = document.querySelector(".content__issue");

  helpButton.addEventListener("click", (e) => {
    e.preventDefault();
    openHelpModal();
  });
  if (resetPassword) {
    resetPassword.addEventListener("click", (e) => {
      e.preventDefault();
      openPasswordModal();
    });
  }

  // Show / Hide password
  function setPasswordVisible(input, btn, type, state) {
    input.type = type;
    btn.textContent = state;
    input.focus();
  }

  const passwordBtn = document.querySelector("#show");
  const passwordInput = document.querySelector("#password");

  passwordBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // reset type of input field and label of switch button
    if (passwordInput.type === "text") {
      setPasswordVisible(passwordInput, passwordBtn, "password", "show");
    } else {
      setPasswordVisible(passwordInput, passwordBtn, "text", "hide");
    }
  });

  const resetPasswordBtns = document.querySelectorAll(".show-password");
  resetPasswordBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const bothInputs = document.querySelectorAll(".password-new");
      const bothBtns = document.querySelectorAll(".show-password");

      // Reseting type of password field for each input and button
      if (bothInputs[0].type === "text") {
        for (i = 0; i < bothInputs.length; i++) {
          setPasswordVisible(bothInputs[i], bothBtns[i], "password", "show");
        }
      } else {
        for (i = 0; i < bothInputs.length; i++) {
          setPasswordVisible(bothInputs[i], bothBtns[i], "text", "hide");
        }
      }

      const input = button
        .closest(".content__input")
        .querySelector(".password-new");
      input.focus();
    });
  });

  // Form validation
  const form = document.querySelector("#form");

  formValidate(".form_signin", () => {
    openSuccessModal("You have been loged in successfuly!");
  });
  formValidate(".form_signup", () => {
    openSuccessModal("You have been signed up successfuly!");
  });
  formValidate(".form_reset", () => {
    closePasswordModal()
    setTimeout(() => openSuccessModal("Your password has been changed!"), 500)
  });

  function formValidate(formSelector, callback) {
    const $form = document.querySelector(formSelector);

    if (!$form) return;

    $form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Validate form
      validation();
      // Check whether all inputs are valid and execute callback
      isThereError(callback);

      // Validate form on it's changing
      $form.addEventListener("change", (e) => {
        if (e.target.id !== "password") validation();
      });
    });

    function validation() {
      //   Validating each input inside of a form
      const inputs = $form.querySelectorAll("input");
      inputs.forEach((input) => {
        const inputValue = input.value.trim();

        if (input.id === "name") {
          if (inputValue === "" || inputValue.length <= 1) {
            setErrorFor(input, "Name field should contain at least 2 letters!");
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
        } else if (input.id === "password" || input.id === 'new-password') {
          if (inputValue === "") {
            setErrorFor(input, "Password field is empty!");
          } else if (!isPasswordValid(inputValue)) {
            setErrorFor(
              input,
              "Password should contain 8 letters, one number, one upper and lower case char!"
            );
          } else {
            setSuccessFor(input);
          }
        } else if ( input.id === 'new-password2' ) {
          const firstInputValue = input.closest('form').querySelector('#new-password').value
          if ( inputValue !== firstInputValue ) {
            setErrorFor(input, 'You have typed different passwords!')
          } else {
            console.log( 'success' );
            setSuccessFor(input)
          }
        }
      });
    }

    function cleanInputs() {
      $form.querySelectorAll("input").forEach((input) => (input.value = ""));
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
  }
});
