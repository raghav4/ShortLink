const addLoading = document.getElementById('shortbtn');
const input = document.getElementById('inputUrl');
input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    addLoading.classList.add('loading');
    document.getElementById('shortbtn').click();
  }
});

function SendRequest() {
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
        const outputValue = (document.getElementById('outputLink').value =					`https://tii.now.sh/${response.ShortId}`);
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
}

function copyLink() {
  const copyText = document.getElementById('outputLink');
  copyText.select();
  document.execCommand('copy');
}
