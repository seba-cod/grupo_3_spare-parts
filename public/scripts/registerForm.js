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

const usernameInput = document.querySelector('input#user_name')
const FirstNameInput = document.querySelector('input#first_name')
const LastNameInput = document.querySelector('input#last_name')
const emailInput = document.querySelector('input#email')
const addressInput = document.querySelector('input#address')
const passwordInput = document.querySelector('input#password')
const avatar = document.querySelector('input#avatar')
const terms = document.querySelector('input#terms')
const submitButton = document.querySelector('input#submit')
const form = document.querySelector('#regform')

const toScriptOnUsername = document.querySelector('#toScriptOnUsername')
const toScriptOnFirstName = document.querySelector('#toScriptOnFirstName')
const toScriptOnLastName = document.querySelector('#toScriptOnLastName')
const toScriptOnEmail = document.querySelector('#toScriptOnEmail')
const toScriptOnPassword = document.querySelector('#toScriptOnPassword')
const toScriptOnAddress = document.querySelector('#toScriptOnAddress')
const toScriptOnAvatar = document.querySelector('#toScriptOnAvatar')
const toScriptCheckbox = document.querySelector('#toScriptCheckbox')
    
usernameInput.addEventListener('keyup', (e) => {
  const username = e.target.value;
  if (username.length < 4 ) {
    usernameInput.style.background = dangerColor
    toScriptOnUsername.innerHTML = 'Escribe tu nombre de usuario, cuatro letras minimo'
  }
  if (username.length >= 4) {
    resetErrors(toScriptOnUsername, usernameInput)
    return usernameInput.style.background = succesColor
  }
})

FirstNameInput.addEventListener('keyup', (e) => {
  const firstname = e.target.value;

  if (firstname.length < 2 ) {
    FirstNameInput.style.background = dangerColor
    toScriptOnFirstName.innerHTML = 'Escribe tu nombre'
  }
  if (firstname.length >= 2) {
    resetErrors(toScriptOnFirstName, FirstNameInput)
    return FirstNameInput.style.background = succesColor
  }
})

LastNameInput.addEventListener('keyup', (e) => {
  const lastname = e.target.value;

  if (lastname.length < 2 ) {
    LastNameInput.style.background = dangerColor
    toScriptOnLastName.innerHTML = 'Escribe tu apellido'
  }
  if (lastname.length >= 2) {
    resetErrors(toScriptOnLastName, LastNameInput)
    return LastNameInput.style.background = succesColor
  }
})

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

addressInput.addEventListener('keyup', (e) => {
  const address = e.target.value;

  if (address.length <= 4 ) {
    addressInput.style.background = dangerColor
    toScriptOnAddress.innerHTML = 'Escribe tu dirección real'
  }
  if (address.length > 4) {
    resetErrors(toScriptOnAddress, addressInput)
    return addressInput.style.background = succesColor
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

avatar.addEventListener('change', (e) => {
  if (avatar.value) {
    resetErrors(toScriptOnAvatar, false)
  }
})
terms.addEventListener('change', (e) => {
  if (terms.checked ) {
    resetErrors(toScriptCheckbox, false)
  }
})

regform.addEventListener('submit', (e) => {
  if (usernameInput.value.length < 4 ) {
    e.preventDefault()
    usernameInput.style.background = dangerColor
    toScriptOnUsername.innerHTML = 'Escribe tu nombre de usuario, cuatro letras minimo'
  }
  if (FirstNameInput.value.length < 2 ) {
    e.preventDefault()
    FirstNameInput.style.background = dangerColor
    toScriptOnFirstName.innerHTML = 'Escribe tu nombre'
  }
  if (LastNameInput.value.length < 2 ) {
    e.preventDefault()
    LastNameInput.style.background = dangerColor
    toScriptOnLastName.innerHTML = 'Escribe tu apellido'
  }
  if (emailInput.value.length < 3) {
    e.preventDefault()
      emailInput.style.background = dangerColor
      toScriptOnEmail.innerHTML = 'Escribe un mail válido. Tu email debería contener un arroba. Ejemplo: myEmail@fake.com'
    } 
  if (addressInput.value.length <= 4 ) {
    e.preventDefault()
    addressInput.style.background = dangerColor
    toScriptOnAddress.innerHTML = 'Escribe tu dirección real'
  }
  if (passwordInput.value.length < 6){
    e.preventDefault()
    passwordInput.style.background = dangerColor
    toScriptOnPassword.innerHTML = 'Escribe al menos 6 caracteres'
  }
  if (!terms.checked ) {
    e.preventDefault()
    toScriptCheckbox.innerHTML = 'Debes aceptar los TyC para continuar'
    terms.style.background = dangerColor
  }
  if (!avatar.value) {
    e.preventDefault()
    toScriptOnAvatar.innerHTML = 'Sube una imagen'
  }
})