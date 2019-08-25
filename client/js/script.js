let addLoading = document.getElementById("shortbtn");
let input = document.getElementById("inputUrl");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        addLoading.classList.add("loading");
        document.getElementById("shortbtn").click();
    }
});

function SendRequest() {
    const object = {
        inputUrl: input.value
    };
    var children = document.getElementById("invalidUrl").hasChildNodes();
    fetch("/transfer", {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(function (response) {
            if (response) {
                var outputValue = document.getElementById('outputLink').value = ('https://tii.now.sh/' +
                    response.ShortId);
            }
            if (children) {
                var rem = document.getElementById('removeThis').remove();
            }
            addLoading.classList.remove("loading");
        })
        .catch(function (error) {
            if (error) {
                addLoading.classList.remove("loading");
                if (!children) {
                    var invalid = document.createElement('div');
                    invalid.className = "ui pointing below red label";
                    invalid.setAttribute('id', 'removeThis')
                    invalid.innerText = "Please enter a valid URL";
                    document.getElementById("invalidUrl").appendChild(invalid);
                    document.getElementById('outputLink').value = '';
                }
            }
        })
}

function copyLink() {
    let copyText = document.getElementById("outputLink");
    copyText.select();
    document.execCommand("copy");
}