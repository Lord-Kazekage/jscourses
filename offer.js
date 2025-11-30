let Courses = []; // global variable
const loader = document.getElementById("loader");
const grid = document.getElementById("grid");
loader.style.display = "block";

// Fetch courses
async function getCourses() {
  const url =
    "https://raw.githubusercontent.com/lord-kazekage/myapis/main/coursesapi.json";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Fetching Error Connection Error");
    Courses = await response.json();
    loader.style.display = "none";
    renderCourses();
  } catch (error) {
    alert(error.message);
  }
}

getCourses();

// Render courses
function renderCourses(searchQuery = "", category = "") {
  const filteredCourses = Courses.filter((course) => {
    const matchesSearch =
      course.course_name.toLowerCase().includes(searchQuery) ||
      course.platform.toLowerCase().includes(searchQuery);
    const matchesCategory =
      category === "" || course.platform.toLowerCase() === category;
    return matchesSearch && matchesCategory;
  });

  grid.innerHTML = filteredCourses
    .map(
      (course) => `
    <div class="card">
      <img src="${course.image}" alt="${course.course_name}" loading="lazy">
      <div class="card-content">
        <h3>${course.course_name}</h3>
        <p><strong>Price:</strong> <input id="price-${course.id}" value='${
        course.price
      }' readonly></p>
        <div class="buttons">
          ${
            course.price.toLowerCase() !== "free"
              ? `<button class="btn btn-discount" onclick="Discount(${course.id})">Discount</button>`
              : ""
          }
          <button class="btn btn-viewdetails" onclick='goToDetails(${
            course.id
          })'>View Details</button>
          <button class="btn btn-delete" onclick="deleteCourse(${
            course.id
          })">Delete</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Delete course
function deleteCourse(id) {
  const singleobj = Courses.find((item) => item.id == id);
  Courses = Courses.filter((item) => item.id !== id);
  const alertBox = document.getElementById("customAlert");
  const message = document.getElementById("alertMessage");
  if (singleobj)
    message.textContent = `Course ${singleobj.course_name} Deleted`;
  alertBox.style.display = "block";
  renderCourses();
}

// Close alert
function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}

// Apply discount
function Discount(id) {
  const alertBox = document.getElementById("customAlert");
  const message = document.getElementById("alertMessage");
  const priceElement = document.getElementById(`price-${id}`);
  if (!priceElement) return;

  const discountPercent = Math.floor(Math.random() * (40 - 5 + 1)) + 5;

  for (let i = 0; i < Courses.length; i++) {
    if (Courses[i].id == id) {
      if (Courses[i].discountApplied) {
        message.textContent = "Discount Already Applied";
        alertBox.style.display = "block";
        return;
      }

      let priceNum = parseFloat(Courses[i].price.replace(/[^0-9.]/g, ""));
      let discountedPrice = priceNum - (priceNum * discountPercent) / 100;
      Courses[i].price = `$${discountedPrice.toFixed(2)}`;
      priceElement.value = Courses[i].price;
      message.textContent = `${discountPercent}% Discount Applied`;
      alertBox.style.display = "block";
      Courses[i].discountApplied = true;
      renderCourses();
      return;
    }
  }
}

// Search/filter
function searchfun() {
  const search = document.getElementById("search").value.toLowerCase().trim();
  const categorySelect = document
    .getElementById("categorySelect")
    .value.toLowerCase()
    .trim();
  renderCourses(search, categorySelect);
}

// Go to details page (store only selected course)
function goToDetails(id) {
  const course = Courses.find((c) => c.id == id);
  if (!course) return;
  localStorage.setItem("selectedCourse", JSON.stringify(course));
  window.open("Details-Page.html", "_blank");
}
