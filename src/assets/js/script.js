document.addEventListener('DOMContentLoaded', function(){
	const passwordBtn = document.querySelector('#show')
    const passwordInput = document.querySelector('#password')

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