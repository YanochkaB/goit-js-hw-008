import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput), 500);

refs.form.addEventListener('input', evt => {
    formData[evt.currentTarget.name] = evt.currentTarget.value;
    console.log(formData) //об'єкт email and message
})

populateTextarea();

//робота з текстовими полями (очищення після відправки форми) +++
function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset(); //очистити поля форми
    localStorage.removeItem(STORAGE_KEY); //очистити локальні дані
}

//отримання даних з полів і запис у локал сторідж (одним рядком) +++
function onTextareaInput(evt) {
    const message = JSON.stringify(formData); //значення текстових полів (рядок)

    localStorage.setItem(STORAGE_KEY, message); //додаєм текст з поля в локал сторідж
}

//занесення даних при перезавантаженні сторінки
function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);

    savedMessage ? refs.textarea.value = savedMessage : '';
    
    // if (savedMessage) {
    //     // refs.textarea = refs.textarea.value;
    // } else {
    //     ''
    // }
}


// const json = '{"name":"Mango","age":3,"isHappy":true}';

// const dog = JSON.parse(json);
// console.log(dog); // {name: "Mango", age: 3, isHappy: true}
// console.log(dog.name); // "Mango"