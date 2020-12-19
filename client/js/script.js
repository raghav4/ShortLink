/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const addLoading = document.getElementById('shortbtn');
const input = document.getElementById('inputUrl');
input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    addLoading.classList.add('loading');
    document.getElementById('shortbtn').click();
  }
});

const SendRequest = () => {
  const object = {
    inputUrl: input.value,
  };
  const children = document.getElementById('invalidUrl').hasChildNodes();
  fetch('/transfer', {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response) {
        document.getElementById(
          'outputLink',
        ).value = `https://shrtlk.herokuapp.com/${response.ShortId}`;
      }
      if (children) {
        document.getElementById('removeThis').remove();
      }
      addLoading.classList.remove('loading');
    })
    .catch((error) => {
      if (error) {
        addLoading.classList.remove('loading');
        if (!children) {
          const invalid = document.createElement('div');
          invalid.className = 'ui pointing below red label';
          invalid.setAttribute('id', 'removeThis');
          invalid.innerText = 'Please enter a valid URL';
          document.getElementById('invalidUrl').appendChild(invalid);
          document.getElementById('outputLink').value = '';
        }
      }
    });
};

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const copyLink = () => {
  const copyText = document.getElementById('outputLink');
  copyText.select();
  document.execCommand('copy');
  Toast.fire({
    icon: 'success',
    title: 'Copied URL to clipboard',
  });
};

const toggleCheckBox = () => {
  const passWordInput = document.getElementById('passwordInput');
  const checkbox = document.getElementById('checkbox');
  // eslint-disable-next-line no-unused-expressions
  checkbox.checked
    ? passWordInput.classList.remove('disabled')
    : passWordInput.classList.add('disabled');
};
