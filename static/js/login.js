const username = document.getElementById('username');
const password = document.getElementById('password');
function sendRequest() {
  const object = {
    username: username.value,
    password: password.value,
  };
  console.log(object);
  const usernameChildren = document
    .getElementById('invalidUsername')
    .hasChildNodes();
  const passwordChildren = document
    .getElementById('invalidPassword')
    .hasChildNodes();
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
        const outputValue = (document.getElementById('outputLink').value =					`https://tii.now.sh/${response.ShortId}`);
      }
      if (children) {
        const rem = document.getElementById('removeThis').remove();
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
}
