import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput), 500);

refs.form.addEventListener('input', evt => {
    formData[evt.currentTarget.name] = evt.currentTarget.value;
    console.log(formData) //об'єкт email and message
})

onPopulateTextarea();

//робота з текстовими полями (очищення після відправки форми) +++
function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset(); //очистити поля форми
    localStorage.removeItem(STORAGE_KEY); //очистити локальні дані
}

//отримання даних з полів і запис у локал сторідж (одним рядком) +++
function onTextareaInput(evt) {
    // formData[evt.target.name] = evt.target.value;
    const message = JSON.stringify(formData); //значення текстових полів (рядок)

    localStorage.setItem(STORAGE_KEY, message); //додаєм текст з поля в локал сторідж
}

//занесення даних при перезавантаженні сторінки
function onPopulateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
    // formData = JSON.parse(savedMessage);

  if (savedMessage) {
    formData = JSON.parse(savedMessage);
  }
  if (formData.email) {
    refs.email.value = formData.email;
  }
  if (formData.message) {
    refs.message.value = formData.message;
  }
}


// const json = '{"name":"Mango","age":3,"isHappy":true}';

// const dog = JSON.parse(json);
// console.log(dog); // {name: "Mango", age: 3, isHappy: true}
// console.log(dog.name); // "Mango"