import { db }
from "./firebase-config.js";

import {
  collection,
  getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const courseContainer =
  document.getElementById("courseContainer");

async function loadCourses(){

  const querySnapshot =
    await getDocs(collection(db, "courses"));

  courseContainer.innerHTML = "";

  querySnapshot.forEach((doc) => {

    const course = doc.data();

    let modulesHTML = "";

    course.modules.forEach(module => {

      modulesHTML += `
        <li class="list-group-item">
          ${module}
        </li>
      `;

    });

    const card = `

      <div class="col-md-4">

        <div class="card course-card h-100">

          <img
            src="${course.image}"
            class="card-img-top"
          >

          <div class="card-body">

            <span class="badge bg-danger mb-2">
              ${course.intake}
            </span>

            <h5 class="fw-bold">
              ${course.title}
            </h5>

            <p>${course.description}</p>

            <button
              class="btn btn-outline-danger"
              data-bs-toggle="collapse"
              data-bs-target="#${doc.id}"
            >
              View Modules
            </button>

            <div
              class="collapse mt-3"
              id="${doc.id}"
            >

              <ul class="list-group">
                ${modulesHTML}
              </ul>

            </div>

          </div>

        </div>

      </div>
    `;

    courseContainer.innerHTML += card;

  });

}

loadCourses();