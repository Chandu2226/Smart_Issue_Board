# Smart Issue Board

Smart Issue Board is a simple issue tracking web application built as part of an internship assignment. 
It allows users to create, view, and manage issues with authentication and intelligent duplicate handling.

## 🔧 Tech Stack Chosen
- **Frontend**: HTML, CSS, Vanilla JavaScript  
- **Backend / Database**: Firebase Firestore  
- **Authentication**: Firebase Auth (Email & Password)  
- **Hosting**: Vercel  

### Why this stack?
I chose plain HTML, CSS, and JavaScript to keep the application lightweight, easy to understand, and focused on core logic rather than framework complexity. Firebase provides fast backend setup and real-time capabilities, which is ideal for rapid prototyping.

---

## 🗂️ Firestore Data Structure

### Collection: `issues`
Each issue document contains:
- `title` (string)
- `description` (string)
- `priority` (Low / Medium / High)
- `status` (Open / In Progress / Done)
- `assignedTo` (email)
- `createdBy` (email)
- `createdAt` (timestamp)

This flat structure keeps queries simple and efficient.

---

## 🔍 Similar Issue Handling
When creating a new issue, the system checks existing issue titles using keyword matching.  
If similar words are found, a warning is shown to the user, but the final decision to create the issue is left to them.

This approach avoids over-engineering while still addressing duplicate issues in a practical way.

---

## 🚦 Status Rule
An issue cannot move directly from **Open → Done**.  
Users must move it through **In Progress**, ensuring realistic workflow handling.

---

## ⚠️ Challenges Faced
- Handling similar issues without using heavy AI or ML
- Managing authentication state across pages
- Enforcing status transition rules cleanly

---

## 🚀 Future Improvements
- Edit and update issue status
- Role-based access (Admin/User)
- Better text similarity using NLP
- Pagination for large issue lists

---

## 🧑‍💻 Author
Built as part of an internship assignment to demonstrate practical problem-solving and real-world decision making.

---

## 🚀 Live Demo

Deployed Application URL:  
https://smart-issue-board-two.vercel.app/

