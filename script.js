const stars = Array.from(document.querySelectorAll(".star input"));
const review = document.querySelector("#review");
const submitButton = document.querySelector("#submit");
const reviews = document.querySelector("#reviews");

const boxUrl = "https://jsonbox.io/loganbrixninja_reviews1";

submitButton.addEventListener("click", async () => {
	const numStars = stars.reduce(((num, s) => num + (s.checked ? 1 : 0)), 0);
	disableReview(true);
	await saveReview(review.value, numStars);
	await showReviews();
	alert("Thanks for the review.");
	review.value = "";
	stars.forEach((s) => {
		s.checked = false;
	});
	disableReview(false);
});

stars.forEach((star, i) => {
	star.addEventListener("change", () => {
		stars.forEach((s, j) => {
			s.checked = j <= i;
		});
	});
});

review.addEventListener("keypress", (event) => {
	if (event.code === "Enter") {
		event.preventDefault();
		submitButton.click();
	}
});

showReviews();

function disableReview(disabled = true) {
	review.disabled = !!disabled;
	stars.forEach((s) => {
		s.disabled = !!disabled;
	});
	submitButton.disabled = !!disabled;
}

async function saveReview(text, numStars) {
	const data = { text, numStars };
	await fetch(boxUrl, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(data),
	});
}

async function showReviews() {
	reviews.innerHTML = "";
	const res = await fetch(boxUrl);
	if (!res.ok) {
		return;
	}
	const rows = await res.json();
	rows.forEach(row => {
		const li = document.createElement("li");
		li.textContent = row.numStars + " Star" + (row.numStars === 1 ? "" : "s") + ": " + row.text;
		reviews.appendChild(li);
	});
}
