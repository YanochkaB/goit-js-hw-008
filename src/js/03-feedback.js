import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(messageSubmit), 500);

onPopulateTextarea();

refs.form.addEventListener('input', evt => {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
})


function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function messageSubmit(evt) {
    evt.preventDefault();
  const message = evt.target.value
  localStorage.setItem(STORAGE_KEY, message);
}


function onPopulateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsData = JSON.parse(savedMessage);
  console.log(parsData)
  savedMessage ? (refs.textarea.value = parsData.message) : '';
  savedMessage ? (refs.input.value = parsData.email) : '';

    if (savedMessage) {
      refs.textarea.value = parsData.message
      refs.input.value = parsData.email
    } 
}
