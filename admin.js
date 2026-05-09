import { db, auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= UI ELEMENTS ================= */

const loginSection = document.getElementById("loginSection");
const dashboard = document.getElementById("dashboard");

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

/* ================= LOGIN ================= */

loginBtn.addEventListener("click", async () => {

  try {

    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    alert("Login successful");

  } catch (err) {

    alert("Login failed: " + err.message);

  }

});

/* ================= LOGOUT ================= */

logoutBtn.addEventListener("click", async () => {

  await signOut(auth);

});

/* ================= AUTH STATE ================= */

onAuthStateChanged(auth, (user) => {

  if (user) {

    loginSection.classList.add("d-none");
    dashboard.classList.remove("d-none");

    loadCourses();

  } else {

    loginSection.classList.remove("d-none");
    dashboard.classList.add("d-none");

  }

});

/* ================= FIRESTORE CRUD ================= */

const courseForm = document.getElementById("courseForm");
const courseList = document.getElementById("courseList");

let editMode = false;
let editId = null;

async function loadCourses() {

  courseList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "courses"));

  snapshot.forEach((docItem) => {

    const c = docItem.data();

    const html = `
      <div class="border p-3 mb-2 bg-white rounded">

        <h5>${c.title}</h5>

        <p>${c.intake} | ${c.duration}</p>

        <button class="btn btn-sm btn-primary me-2"
          onclick="editCourse('${docItem.id}', '${c.title}', '${c.duration}', '${c.intake}', '${c.image}', \`${c.description}\`, \`${c.modules}\`)">
          Edit
        </button>

        <button class="btn btn-sm btn-danger"
          onclick="deleteCourse('${docItem.id}')">
          Delete
        </button>

      </div>
    `;

    courseList.innerHTML += html;

  });

}

/* ADD / UPDATE */

courseForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const data = {
    title: title.value,
    duration: duration.value,
    intake: intake.value,
    image: image.value,
    description: description.value,
    modules: modules.value.split(",")
  };

  if (editMode) {

    await updateDoc(doc(db, "courses", editId), data);

    alert("Updated");

    editMode = false;

  } else {

    await addDoc(collection(db, "courses"), data);

    alert("Added");

  }

  courseForm.reset();
  loadCourses();

});

/* EDIT */

window.editCourse = function(id, t, d, i, img, desc, mods) {

  editMode = true;
  editId = id;

  title.value = t;
  duration.value = d;
  intake.value = i;
  image.value = img;
  description.value = desc;
  modules.value = mods;

  document.getElementById("formTitle").innerText = "Edit Course";

};

/* DELETE */

window.deleteCourse = async function(id) {

  if (confirm("Delete this course?")) {

    await deleteDoc(doc(db, "courses", id));

    loadCourses();

  }

};