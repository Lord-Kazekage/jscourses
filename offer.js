let Courses = []; // global variable
const loader = document.getElementById("loader");
loader.style.display = "block";
async function getCourses() {
  const url =
    "https://raw.githubusercontent.com/lord-kazekage/myapis/main/coursesapi.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Fetching Error Connection Errro");
    }

    Courses = await response.json();
    loader.style.display = "none";
    renderCourses(); // render after fetching
  } catch (error) {
    alert(error.message);
  }
}

getCourses();

const grid = document.getElementById("grid");

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
    <div class="card" >
      <img src="${course.image}" alt="${course.course_name}" loading="lazy">
      <div class="card-content">
        <h3>${course.course_name}</h3>
      
        <p><strong>Price:</strong><input id="price-${course.id}" value='${
        course.price
      }'> </p>
        <div class="buttons">
          ${
            course.price.toLowerCase() !== "free"
              ? `<button class="btn btn-discount" onclick="Discount(${course.id})">Discount</button>`
              : ""
          }
          <button  class="btn btn-viewdetails"><a href='Details-Page.html?id=${
            course.id
          }&data=${encodeURIComponent(
        JSON.stringify(Courses)
      )}' target='_blank'>View Details</a></button>
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
function deleteCourse(id) {
  // 1. Get the single object BEFORE filtering
  const singleobj = Courses.find((item) => item.id == id);

  Courses = Courses.filter((item) => item.id !== id);

  const alertBox = document.getElementById("customAlert");
  const message = document.getElementById("alertMessage");

  if (singleobj) {
    message.textContent = `Course ${singleobj.course_name} Deleted`;
  }
  alertBox.style.display = "block";
  renderCourses();
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}

function Discount(id) {
  const alertBox = document.getElementById("customAlert");
  const message = document.getElementById("alertMessage");
  const priceElement = document.getElementById(`price-${id}`);
  if (!priceElement) return;
  let discountPercent = Math.floor(Math.random() * (40 - 5 + 1)) + 5;
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

function searchfun() {
  const search = document.getElementById("search").value.toLowerCase().trim();
  const categorySelect = document
    .getElementById("categorySelect")
    .value.toLowerCase()
    .trim();
  renderCourses(search, categorySelect);
}
