import throttle from "lodash.throttle";

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
};
// console.log(refs)

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', onTextareaInput);

populateTextarea();

//робота з текстовим полем 
function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
}

//отримання даних з полів
function onTextareaInput(evt) {
    const message = evt.currentTarget.value;
    localStorage.setItem('feedback-form-state', message);
}

//занесення даних при перезавантаженні сторінки
function populateTextarea() {
    const savedMessage = localStorage.getItem('feedback-form-state');

    savedMessage ? refs.textarea.value = savedMessage : '';
    
}