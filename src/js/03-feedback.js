import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(messageSubmit), 500);
formEl.addEventListener('submit', onFormSubmit);

onPopulateTextarea(formEl);

function onFormSubmit(evt) {
  evt.preventDefault();
  
  const formFields = {
    email: evt.currentTarget.email.value,
    message: evt.currentTarget.message.value,
  }
  console.log(formFields)

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function messageSubmit(evt) {
  const formText = evt.target.closest('form')
  const formState = {
    email: formText.email.value,
    message: formText.message.value,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}


function onPopulateTextarea(formText) {
  const localStText = localStorage.getItem(STORAGE_KEY)
  
  if (!localStText) return;
  const { email, message } = JSON.parse(localStText);
  formText.email.value = email;
  formText.message.value = message;
}
