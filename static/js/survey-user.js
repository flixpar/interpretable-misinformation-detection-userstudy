function randomGroup() {
	return Math.floor(Math.random() * 6) + 1;
}

document.getElementById("next-button").addEventListener("click", function() {
	const userName = document.getElementById("form-name").value;
	const userEmail = document.getElementById("form-email").value;
	const userAge = document.getElementById("form-age").value;

	if (userName === "" || userEmail === "" || userAge === "") {
		alert("Please fill out all fields.");
		return;
	}

	const user = {
		name: userName,
		email: userEmail,
		age: userAge,
		group: randomGroup(),
	};
	fetch("/survey/user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user),
	}).then(response => {
		if (response.ok) {
			window.location.href = "/survey/1";
		} else {
			alert("Error saving user.");
		}
	});
});