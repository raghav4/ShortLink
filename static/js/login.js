let username = document.getElementById("username");
let password = document.getElementById("password");
function sendRequest() {
	const object = {
		username: username.value,
		password: password.value
	};
	console.log(object);
	let usernameChildren = document
		.getElementById("invalidUsername")
		.hasChildNodes();
	let passwordChildren = document
		.getElementById("invalidPassword")
		.hasChildNodes();
	fetch("/transfer", {
		method: "POST",
		body: JSON.stringify(object),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.then(function(response) {
			if (response) {
				var outputValue = (document.getElementById("outputLink").value =
					"https://tii.now.sh/" + response.ShortId);
			}
			if (children) {
				var rem = document.getElementById("removeThis").remove();
			}
			addLoading.classList.remove("loading");
		})
		.catch(function(error) {
			if (error) {
				addLoading.classList.remove("loading");
				if (!children) {
					var invalid = document.createElement("div");
					invalid.className = "ui pointing below red label";
					invalid.setAttribute("id", "removeThis");
					invalid.innerText = "Please enter a valid URL";
					document.getElementById("invalidUrl").appendChild(invalid);
					document.getElementById("outputLink").value = "";
				}
			}
		});
}
