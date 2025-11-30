# Dynamic Form Builder (Spring WebFlux + React)

A full-stack dynamic form application where the **backend provides a JSON schema**, the **frontend renders the form automatically**, and submitted data is **validated and stored in a JSON file**.

This project fulfills all assignment requirements:  
✔ Dynamic form  
✔ Frontend + backend validation  
✔ JSON storage  
✔ Reactive WebFlux  
✔ Proper validation errors  
✔ Deployments working  
✔ Clean APIs  

---

## 🚀 Tech Stack

### **Backend**
- Java 21  
- Spring Boot (WebFlux)  
- Project Reactor (Mono / Flux)  
- Jackson Databind   
- JSON file storage  
- CORS support for Netlify  

### **Frontend**
- React (Vite)  
- React Query  
- Axios  
- Tailwind CSS  

---

## 📌 Features

### 🔹 Dynamic Form Rendering
Backend provides `form-schema.json` → frontend builds form UI from it.

### 🔹 Field Types Supported
- text  
- number  
- select  
- multi-select  
- textarea  
- switch  
- date  

### 🔹 Validation (Frontend + Backend)
Supports:
- required  
- minLength / maxLength  
- min / max  
- regex  
- minSelected / maxSelected  
- minDate  

## 📂Frontend Folder Structure

```
src/
│── pages/
│   ├── FormPage.jsx
│   ├── SubmissionsPage.jsx
│── components/
│   ├── DataTable.jsx
│   ├── DynamicForm.jsx
│   ├── Loader.jsx
│   ├── Modal.jsx  
│   ├── ValidationMessage.jsx 
│
│── services/
│   └── api.js
│   └── formService.js
│── utils/
│   └── validateField.jsx
│   └── validateForm.jsx
│
│── App.jsx
│── main.jsx
```
## 📂Backend Folder Structure
```
│   TaskApplication.java
│
├───config
│       CorsGlobalConfig.java
│
├───exception
│       GlobalExceptionHandler.java
│
├───interfaces
│       FormService.java
│
├───mapper
│       FormMapper.java
│
├───model
│       FormField.java
│       FormSchema.java
│       FormSubmission.java
│
├───repository
│       FormRepository.java
│
├───service
│       FormServiceImpl.java
│
├───storage
│       JsonStorage.java
│
└───validation
        ValidationService.java

```
## ▶️ Run Locally Frontend

```
npm install
npm run dev
```

App will start at:  
➡️ http://localhost:5173/
## 🏗️ Build for Production

```
npm run build
```

## ▶️ Run Locally Backend

```
gradlew clean build
gradlew bootRun
http://localhost:4000

```


## 📡 API Endpoints Used

```

GET      /api/schema
POST    /api/submissions
GET     /api/submissions
```


## 🔒 CORS Configuration

```
Allowed Origins:

Frontend (Netlify):
https://dynamicformtask.netlify.app

Localhost

Railway deployment
```
## Configured inside:
```
CorsConfig.java
```

## 📝 Sample Submission Storage
```
File: submissions.json

[
  {
    "id": "f83c3f61-ce90-4a07-bd7f",
    "createdAt": "2025-11-30T12:20:11",
    "data": {
      "fullName": "Himani",
      "age": 22,
      "gender": "Female",
      "hobbies": ["Music", "Reading"],
      "dob": "2001-09-10",
      "bio": "Hello world!",
      "notifications": true
    }
  }
]
```

## 🚀 Deployment
```
 Frontend

Deployed on Netlify- https://dynamicformtask.netlify.app/

Backend

Deployed on Railway -taskmatbook.up.railway.app 

CORS enabled properly.
```

## ✔ Assignment Requirements Completed
```
Requirement	Status
Dynamic form from JSON schema	✅
Frontend validation	✅
Backend validation	✅
JSON storage	✅
WebFlux (Reactive)	✅
Error handling (400/201)	✅
Deployed backend	✅
Deployed frontend	✅

```
