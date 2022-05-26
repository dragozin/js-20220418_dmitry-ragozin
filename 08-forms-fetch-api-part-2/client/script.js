import fetchJson from './fetch-json.js';

const { form } = document.forms;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const { userEmail } = form.elements;

  if (!checkValidity(userEmail)) {
    return;
  }

  const formData = new FormData(form);

  formData.set('avatarFile', avatarFile);
  let response;

  try {
    response = await fetchJson(form.action, {
      method: 'POST',
      body: formData,
    });
  } catch {
    console.log('error');
  }
});

let avatarFile = null;

form.querySelector('[data-element="choose-avatar"]').addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.onchange = () => {
    const [file] = fileInput.files;

    fileInput.remove();

    avatarFile = file;
    const img = document.createElement('img');

    img.src = window.URL.createObjectURL(avatarFile);
    img.className = 'avatar-preview';
    img.onload = function () {
      window.URL.revokeObjectURL(avatarFile);
    };
    img.alt = 'Avatar';

    const container = form.querySelector('[data-element="avatar-container"]');
    container.innerHTML = '';

    container.append(img);
  };

  fileInput.hidden = true;

  document.body.append(fileInput);

  fileInput.click();
});

function checkValidity(element) {
  if (element.validity.valid) {
    return true;
  }

  element.classList.add('is-invalid');

  if (!element.onfocus) {
    element.onfocus = () => element.classList.remove('is-invalid');
  }

  return false;
}
