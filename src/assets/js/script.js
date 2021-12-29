document.addEventListener('DOMContentLoaded', function(){
    const passwordBtn = document.querySelector("#show");
    const passwordInput = document.querySelector("#password");

    document.querySelector('.content__help').addEventListener('click', e => {
        e.preventDefault()
    })

    // Show / Hide password
    passwordBtn.addEventListener("click", (e) => {
      e.preventDefault();
  
      // reset type of input field and label of switch button
      if (passwordInput.type === "text") {
        passwordInput.type = "password";
        passwordBtn.textContent = "show";
      } else {
        passwordInput.type = "text";
        passwordBtn.textContent = "hide";
      }
    });
  
    // Form validation
    const form = document.querySelector('#form')
    const name = document.querySelector('#name')
    const email = document.querySelector('#email')
    const password = document.querySelector('#password')
    const successLabel = document.querySelector('.content__success')


    form.addEventListener('submit', e => {
        e.preventDefault()

        const isValid = validateForm()

        if ( isValid ) {
            cleanInputs()
            successLabel.style.display = 'flex'
            setTimeout(() => {
                successLabel.style.display = 'none'
            }, 3000)
        }

        form.addEventListener('change', e => {
            if( e.target.id === 'password' ) return
            const isValid = validateForm()
        })
    })

    function validateForm() {
        // get the values from the input
        const emailInput = email.value.trim()
        const passwordInput = password.value.trim()

        // Name field

        if ( name ) {
            const nameInput = name.value.trim()

            if ( nameInput === '' ) {
                setErrorFor(name, `Name field shouldn't be empty`)
            }
            
            else {
                setSuccessFor(name)
            }
        }

        // Email field
        if ( emailInput === '' || !isEmailValid(emailInput) ) {
            setErrorFor(email, `The email is not valid!`)
        }
        
        else {
            setSuccessFor(email)
        }

        // Password field
        if ( passwordInput === '' ) {
            setErrorFor(password, `Password field shouldn't be empty`)
        }

        else if ( !isPasswordValid(passwordInput) ) {
            setErrorFor(password, `Your password should contain at least 8 letters, one number, one upper and lower case letters.`)
        }
        
        else {
            setSuccessFor(password)
        }

        // Checking whether there is an error field
        const errorField = document.querySelector('.content__field_error input')
        if ( errorField ) {
            errorField.focus()
            successLabel.style.display = 'none'
            return false
        }

        return true
    }

    function setErrorFor(element, message) {
        const field = element.closest('.content__field')
        field.classList.add('content__field_error')
        field.querySelector('.content__error').textContent = message
    }

    function setSuccessFor(element) {
        const field = element.closest('.content__field')
        field.classList.remove('content__field_error')
        field.querySelector('.content__error').textContent = ''
    }

    function isEmailValid(email) {
	    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    function isPasswordValid(password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    }

    function cleanInputs() {
        form.querySelectorAll('input').forEach( input => input.value = '' )
    }

});