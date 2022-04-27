enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__user-input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_type_disabled',
    inputErrorClass: 'popup__user-input_type_error',
    errorClass: 'popup__error_visible'
});

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);

    Array.from(forms).forEach((form) => {
        
        form.addEventListener('input', (event) => handleFormInput(event, form, config));
    });
}

function handleFormInput(event, form, config) {
    const input = event.target;
    const errorNode = document.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
        errorNode.textContent="";
        input.classList.remove(config.inputErrorClass);
        toggleButton(form, config);
    } else {
        errorNode.textContent=input.validationMessage;
        errorNode.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
        toggleButton(form, config);
    }
}

function toggleButton(form, config) {
    const buttonSubmit = document.querySelector(config.submitButtonSelector);
    buttonSubmit.disabled = !form.checkValidity();
    buttonSubmit.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}