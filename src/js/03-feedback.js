import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.js-feedback-form');
const formData = {};

// Отслеживаем на форме событие input
// Делаем так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд
form.addEventListener('input', throttle(onFormFieldsInput, 500));
form.addEventListener('submit', onFormSubmit);
populateFormFields();


// Записываем в локальное хранилище объект с полями email и message, в которых сохраняем текущие значения полей формы 
function onFormFieldsInput (event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }

// При сабмите формы очищаем хранилище и поля формы
// Выводи объект с полями email, message и текущими их значениями в консоль
function onFormSubmit(event) {
  event.preventDefault();

  const savedFieldsData = localStorage.getItem(STORAGE_KEY);
  const parsedFieldsData = JSON.parse(savedFieldsData);
  console.log(parsedFieldsData);

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// При загрузке страницы проверяем состояние хранилища, и если там есть сохраненные данные, заполняем ими поля формы. В противном случае поля будут пустыми
function populateFormFields() {
  const savedFieldsData = localStorage.getItem(STORAGE_KEY);
  const parsedFieldsData = JSON.parse(savedFieldsData);

  if (savedFieldsData) {
      const { email, message } = parsedFieldsData;
      form.email.value = email;
      form.message.value = message;
  }
}