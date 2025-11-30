<<<<<<< HEAD
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
=======
const loader = document.getElementById("loader");
async function getCourses() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const data = params.get("data");
  let CoursesArray;

  if (data) {
    CoursesArray = JSON.parse(decodeURIComponent(data));
  }
  console.log(CoursesArray);
  const url =
    "https://raw.githubusercontent.com/lord-kazekage/myapis/main/coursesapi.json";

  try {
    const singleiddata = CoursesArray.filter((item) => item.id == id);
    renderCourses(singleiddata);
    loader.style.display = "none";
  } catch (error) {
    alert(error.message);
  }
}
getCourses();

function renderCourses(Courses) {
  grid.innerHTML = Courses.map(
    (course) => `
   <div class="detail-card">
  <img class="detail-image" src="${course.image}" alt="${
      course.course_name
    }" loading="lazy">

  <div class="detail-card-content">
    <h2>${course.course_name}</h2>
    <p ><strong>Platform:</strong> ${course.platform}</p>
    <p>${course.description}</p>
    <p ><strong>Duration:</strong> ${course.duration}</p>
    <p ><strong>Discount Applied:</strong>   ${
      course.price.toLowerCase() === "free"
        ? "This course is free"
        : course.discountApplied
        ? "Discount Applied"
        : "Discount Not Applied"
    }</p>
    <p ><strong>Price:</strong>  <span>${course.price}</span></p>

    <button class="detail-btn-home">
      <a href="offer.html">Back to Home</a>
    </button>
  </div>
</div>

  `
  ).join("");
}
>>>>>>> 06b71cd55a7a043e216e206fc26c86bb418b104b
