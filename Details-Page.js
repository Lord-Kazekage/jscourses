const loader = document.getElementById("loader");
const grid = document.getElementById("grid");

const params = new URLSearchParams(window.location.search);
const data1 = params.get("data");
const CoursesArray = JSON.parse(decodeURI(data1));
const id = params.get("id");
if (data1) loader.style.display = "none";
console.log("Array", CoursesArray);
function renderCourseDetails() {
  const singleCourse = CoursesArray.find((course) => course.id == id);

  if (!singleCourse) {
    grid.innerHTML = "<p>Course not found</p>";
    return;
  }

  grid.innerHTML = `
    <div class="detail-card">
      <img class="detail-image" src="${singleCourse.image}" alt="${
    singleCourse.course_name
  }" loading="lazy">
      <div class="detail-card-content">
        <h2>${singleCourse.course_name}</h2>
        <p><strong>Platform:</strong> ${singleCourse.platform}</p>
        <p>${singleCourse.description}</p>
        <p><strong>Duration:</strong> ${singleCourse.duration}</p>
       <p><strong>Discount Status:</strong> ${
         singleCourse.price.toLowerCase() === "free"
           ? "This course is free"
           : singleCourse.discountApplied
           ? "Discount Applied of " + singleCourse.discountAmount + " Rs"
           : "No Discount Applied Yet"
       }</p>
        <p><strong>Price:</strong> <span>${singleCourse.price}</span></p>
        <button class="detail-btn-home">
          <a href="offer.html">Back to Home</a>
        </button>
      </div>
    </div>
  `;
}
renderCourseDetails();
