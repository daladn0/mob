document.addEventListener('DOMContentLoaded', function(){
	const passwordBtn   = document.querySelector('#show')
    const passwordInput = document.querySelector('#password')
    const loginBtn      = document.querySelector('#login')
    const signupBtn     = document.querySelector('#signup')

    passwordBtn.addEventListener('click', e => {
        e.preventDefault()

        // reset type of input field and label of switch button
        if ( passwordInput.type === 'text' ) {
            passwordInput.type = 'password'
            passwordBtn.textContent = 'show'
        } else { 
            passwordInput.type = 'text'
            passwordBtn.textContent = 'hide'
        }
    })
});