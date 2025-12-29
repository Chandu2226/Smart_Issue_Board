import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const issueList = document.getElementById("issueList");
const createBtn = document.getElementById("createIssueBtn");
const warningText = document.getElementById("similarWarning");

const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const statusInput = document.getElementById("status");
const assignedToInput = document.getElementById("assignedTo");

const filterStatus = document.getElementById("filterStatus");
const filterPriority = document.getElementById("filterPriority");

let allIssues = [];

/* ---------------- FETCH & DISPLAY ISSUES ---------------- */

async function fetchIssues() {
  const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  allIssues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  displayIssues();
}

function displayIssues() {
  issueList.innerHTML = "";

  let filtered = allIssues.filter(issue => {
    return (
      (!filterStatus.value || issue.status === filterStatus.value) &&
      (!filterPriority.value || issue.priority === filterPriority.value)
    );
  });

  filtered.forEach(issue => {
    const div = document.createElement("div");
    div.className = `issue ${issue.priority.toLowerCase()}`;
    div.innerHTML = `
      <h4>${issue.title}</h4>
      <p>${issue.description}</p>
      <p><b>Status:</b> ${issue.status}</p>
      <p><b>Priority:</b> ${issue.priority}</p>
      <p><b>Assigned To:</b> ${issue.assignedTo}</p>
      <small>Created by ${issue.createdBy}</small>
    `;
    issueList.appendChild(div);
  });
}

filterStatus.addEventListener("change", displayIssues);
filterPriority.addEventListener("change", displayIssues);

/* ---------------- SIMILAR ISSUE CHECK ---------------- */

function isSimilarIssue(newTitle) {
  const keywords = newTitle.toLowerCase().split(" ");
  return allIssues.some(issue =>
    keywords.some(word => issue.title.toLowerCase().includes(word))
  );
}

/* ---------------- CREATE ISSUE ---------------- */

createBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const priority = priorityInput.value;
  const status = statusInput.value;
  const assignedTo = assignedToInput.value.trim();

  if (!title || !priority || !assignedTo) {
    alert("Please fill required fields");
    return;
  }

  // Similar issue warning
  if (isSimilarIssue(title)) {
    warningText.innerText =
      "⚠️ Similar issue exists. You can still create if needed.";
  } else {
    warningText.innerText = "";
  }

  // Status rule
  if (status === "Done") {
    alert("Issue cannot move directly from Open to Done.");
    return;
  }

  await addDoc(collection(db, "issues"), {
    title,
    description,
    priority,
    status,
    assignedTo,
    createdBy: auth.currentUser.email,
    createdAt: new Date()
  });

  titleInput.value = "";
  descInput.value = "";
  assignedToInput.value = "";

  fetchIssues();
});

/* ---------------- INITIAL LOAD ---------------- */

fetchIssues();
