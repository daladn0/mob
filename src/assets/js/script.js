document.addEventListener("DOMContentLoaded", function () {
  // Confirm email/reset password

  const confirmForm = document.querySelector(".form_confirm");
  const resetForm = document.querySelector(".form_reset");
  const heading = document.querySelector(".content__subtitle");

  heading.innerHTML = "Confirm your email";

  if (confirmForm && resetForm) {
    resetForm.style.display = "none";
  }

  // Hide cofirm form and show reset password form if email is confirmed
  formValidate(".form_confirm", () => {
    resetForm.style.display = "";
    confirmForm.style.display = "none";
    heading.innerHTML = "Reset password";
  });

  formValidate(".form_reset", () => {
    openSuccessModal("Your password has been changed");
    disableSuccessClose()
    setTimeout(() => {
      window.location.href = "/mob/dist";
    }, 2000)
  });

  // Modal window
  function modal({ modalWindow, heading = "FoxHub" }) {
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
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("modal_active");
      document.body.style.overflow = "";
    }
    
    const handleClose = (e) => {
      if (e.target === modal || e.target === close) {
        closeModal();
      }
    }

    modal.addEventListener("click", handleClose);

    function disableClose() {
      modal.removeEventListener('click', handleClose)
    }

    return {
      openModal,
      closeModal,
      disableClose
    };
  }

  const { openModal: openHelpModal, closeModal: closeHelpModal } = modal({
    heading: "Following frequently asked questions might help you!",
    modalWindow: ".modal_help",
  });

  const { openModal: openSuccessModal, closeModal: closeSuccessModal, disableClose: disableSuccessClose } = modal({
    heading: "Success!",
    modalWindow: ".modal_success",
  });

  // Setting modal open button
  const helpButton = document.querySelector(".content__help");

  helpButton.addEventListener("click", (e) => {
    e.preventDefault();
    openHelpModal();
  });

  // Show / Hide password
  function setPasswordVisible(input, btn, type, state) {
    input.type = type;
    btn.textContent = state;
    input.focus();
  }

  const passwordBtn = document.querySelector("#show");
  const passwordInput = document.querySelector("#password");

  if (passwordBtn) {
    passwordBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // reset type of input field and label of switch button
      if (passwordInput.type === "text") {
        setPasswordVisible(passwordInput, passwordBtn, "password", "show");
      } else {
        setPasswordVisible(passwordInput, passwordBtn, "text", "hide");
      }
    });
  }

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
  formValidate(".form_signin", () => {
    openSuccessModal("You have been loged in successfuly!");
  });

  formValidate(".form_signup", () => {
    openSuccessModal("You have been signed up successfuly!");
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
        } else if (input.id === "password" || input.id === "new-password") {
          passwordValidation(input, inputValue)

        } else if (input.id === "new-password2") {
          const firstInputValue = input.closest("form").querySelector("#new-password").value;

          // If first password isn't equal to second one
          if (inputValue !== firstInputValue) {
            setErrorFor(input, "You have typed different passwords!");
          } else {
            setSuccessFor(input);
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

    function passwordValidation(input, inputValue) {
      const upperCaseRegExp = /(.*?[A-Z])/gm
      const lowerCaseRegExp = /(.*?[a-z])/gm
      const digitsRegExp = /(.*?[0-9])/gm
      const lengthRegExp = /.{8,}/gm

      // Empty password
      if (inputValue === "") {
        setErrorFor(input, "Password field is empty!");
      } 

      // No number
      else if (!digitsRegExp.test(inputValue)) {
        setErrorFor(
          input,
          "Password should contain at least one number!"
        );
      }

      // No lowwer case char
      else if(!lowerCaseRegExp.test(inputValue)) {
        setErrorFor(
          input,
          "Password should contain at least one lowwer case char!"
        );
      }

      // No upper case char
      else if(!upperCaseRegExp.test(inputValue)) {
        setErrorFor(
          input,
          "Password should contain at least one upper case char!"
        );
      }

      // Not long enough
      else if(!lengthRegExp.test(inputValue)) {
        setErrorFor(
          input,
          "Password should contain at least 8 letters!"
        );
      }

      else {
        setSuccessFor(input);
      }
    }
  }
});
