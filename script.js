const review = document.querySelector("#review");
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", () => {
	alert("Thanks for the report");
	review.value = "";
	stars.forEach((s) => {
		s.checked = false;
	});
});

const stars = Array.from(document.querySelectorAll(".star"));
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
})