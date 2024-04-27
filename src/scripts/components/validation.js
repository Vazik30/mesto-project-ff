
//показывает ошибку валидации формы

const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
};


//скрывают ошибку валидации формы
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

//проверка на валидность формы
const checkInputValidity = (formElement, inputElement,inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement,inputErrorClass, errorClass, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (formElement, inputElement, submitButtonSelector, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputElement));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement);
        });
    });
};


function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement,
            config.inputSelector,
            config.submitButtonSelector,
            config.inactiveButtonClass,
            config.inputErrorClass,
            config.errorClass)

    });
};

// проверяет валидацию формы на каждом нажатии кнопки
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}


const toggleButtonState = (inputList, buttonElement) => {
    buttonElement.disabled = !!hasInvalidInput(inputList);
}

const disableValidation = (formElement, config) => {

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config.inputErrorClass, config.errorClass);
        inputElement.setCustomValidity("");
    });
};

export {enableValidation, disableValidation}