document.getElementById("next-button").addEventListener("click", function() {
	const comments = document.getElementById("comments").value;
	let feedback = {
		"comments": comments,
	};

	const scoreNames = ["useful-preds", "useful-expl", "difficulty-noassistance", "difficulty-assisted", "agree-freq"];
	for (let scoreName of scoreNames) {
		let scoreInput = document.querySelector(`input[name="${scoreName}"]:checked`);
		if (scoreInput == null) {
			alert("Please fill out all the questions before continuing.");
			return;
		}
		let score = parseInt(scoreInput.value);
		feedback[scoreName] = score;
	}

	fetch("/survey/feedback", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(feedback),
	}).then(response => {
		if (response.ok) {
			window.location.href = `/survey/complete`;
		} else {
			alert("Error saving user.");
		}
	});
});
