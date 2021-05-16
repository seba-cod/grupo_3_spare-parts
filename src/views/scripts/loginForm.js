const dangerColor = 'rgba(255,0,0,0.2)';
const succesColor = 'rgba(0,255,0,0.2)';

function resetErrors(messageElement, input){
    if (messageElement){
    messageElement.innerHTML = '';
    }
    if (input){
    input.style.background = 'rgba(255,0,0,0)'
    }
}
    const emailInput = document.querySelector('#emailInput')
    const passwordInput = document.querySelector('#passwordInput')
    const toScriptOnEmail = document.querySelector('#toScriptOnEmail')
    const toScriptOnPassword = document.querySelector('#toScriptOnPassword')
    emailInput.focus();

    emailInput.addEventListener('keyup', (e) => {
        email = e.target.value;
        // Veo si lo que escribió es mayor a 3 caracteres
        if (email.length < 3) {
            emailInput.style.background = dangerColor
            toScriptOnEmail.innerHTML = 'Escribe un mail válido. Tu email debería contener un arroba. Ejemplo: myEmail@fake.com'
        } 

        const emailSplitByAt = email.split('@')
        // Pregunto si mi array divido por el arroba tiene más de una posición 
        if (emailSplitByAt.length > 0){
            //Busco un punto en su segunda posición
            let stringAfterAt = emailSplitByAt[1].split('.')
            if (stringAfterAt[1].length>0) {
            resetErrors(toScriptOnEmail, emailInput)
            return emailInput.style.background = succesColor
            }
        }
    })

    passwordInput.addEventListener('keyup', (e) => {
        password = e.target.value;
        if (password.length < 6){
        passwordInput.style.background = dangerColor
        toScriptOnPassword.innerHTML = 'Escribe al menos 6 caracteres'
        }
        if (password.length >= 6){
        resetErrors(toScriptOnPassword, passwordInput)
        return passwordInput.style.background = succesColor
        }
    } );
