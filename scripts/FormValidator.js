enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__user-input',
  inputErrorClass: 'popup__user-input_type_error',
  errorClass: 'popup__error_visible',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_type_disabled'
});

function enableValidation({formSelector, ...rest}) {
  const forms = document.querySelectorAll(formSelector);
  Array.from(forms).forEach((form) => {
    form.addEventListener('submit', (e) => {
    e.preventDefault();
    });
  setEventListeners(form, rest);
  toggleButton(form, rest);
  });
}

function setEventListeners(form, {inputSelector, ...rest}) {
  const inputs = form.querySelectorAll(inputSelector);
  Array.from(inputs).forEach((input) => {
    input.addEventListener('input', (event) => handleFormInput(event, form, rest));
  });
}

function handleFormInput(event, form, {inputErrorClass, errorClass,...rest}) {
  const input = event.target;
  const errorNode = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    errorNode.textContent="";
    input.classList.remove(inputErrorClass);
    toggleButton(form, rest);
  } else {
    errorNode.textContent=input.validationMessage;
    errorNode.classList.add(errorClass);
    input.classList.add(inputErrorClass);
    toggleButton(form, rest);
  }
}

function toggleButton(form, {submitButtonSelector, inactiveButtonClass}) {
  const buttonSubmit = form.querySelector(submitButtonSelector);
  buttonSubmit.disabled = !form.checkValidity();
  buttonSubmit.classList.toggle(inactiveButtonClass, !form.checkValidity());
}