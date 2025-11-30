const loader = document.getElementById("loader");
const grid = document.getElementById("grid");

window.addEventListener("DOMContentLoaded", () => {
  const course = JSON.parse(localStorage.getItem("selectedCourse") || "{}");

  if (!course || Object.keys(course).length === 0) {
    grid.innerHTML = "<p>No course selected!</p>";
    loader.style.display = "none";
    return;
  }

  renderCourseDetails(course);
  loader.style.display = "none";
});

function renderCourseDetails(course) {
  grid.innerHTML = `
    <div class="detail-card">
      <img class="detail-image" src="${course.image}" alt="${
    course.course_name
  }" loading="lazy">
      <div class="detail-card-content">
        <h2>${course.course_name}</h2>
        <p><strong>Platform:</strong> ${course.platform}</p>
        <p>${course.description}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
        <p><strong>Discount Status:</strong> ${
          course.price.toLowerCase() === "free"
            ? "This course is free"
            : course.discountApplied
            ? "Discount Applied"
            : "Discount Not Applied"
        }</p>
        <p><strong>Price:</strong> <span>${course.price}</span></p>
        <button class="detail-btn-home">
          <a href="offer.html">Back to Home</a>
        </button>
      </div>
    </div>
  `;
}
