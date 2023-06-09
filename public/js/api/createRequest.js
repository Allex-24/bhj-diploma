/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  
  xhr.responseType = 'json';
  xhr.open(options.method, options.url);

  xhr.onload = () => {
    if (xhr.status === 200) {
      options.callback(null, xhr.response);
    } else {
      options.callback(new Error(xhr.statusText), null);
    }
  };

  xhr.onerror = () => {
    options.callback(new Error('Network Error'), null);
  };

  if (options.method === 'GET') {
    xhr.send();
  } else {
    const formData = new FormData();
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
    xhr.send(formData);
  }
};

