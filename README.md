# <img src="https://raw.githubusercontent.com/h4jack/MessFinder/refs/heads/main/public/logo.svg" alt="Logo" height="30"/> MessFinder

## 🚀 Introduction

MessFinder is a final-year graduation project designed to bridge the gap between students or working professionals seeking accommodation and property owners offering rooms or mess facilities. The platform serves as an intermediary, facilitating easy connections and ensuring a seamless experience for both parties.

🔗 Live Demo: [mess-finder.vercel.app](https://mess-finder.vercel.app)

## 🧠 Features

- User Registration & Login: Secure authentication for both students/professionals and room owners.
- Profile Management: Users can update personal details, preferences, and accommodation requirements.
- Search & Filter: Advanced search options to find available rooms or mess facilities based on location, price, and amenities.
- Booking System: Direct communication between users and owners to discuss terms and finalize bookings.
- Admin Dashboard: Admin panel to manage users, listings, and oversee platform activities.

## Screenshots

### Search Screens
![Home Screen](https://github.com/user-attachments/assets/d310794b-dd75-4ec7-ab17-0fa8c04780a2)
![Search Result](https://github.com/user-attachments/assets/0112e9e2-d093-40e5-ac04-3556c4600d14)

### Single Room Details View
![Single Room Details View](https://github.com/user-attachments/assets/205c8bc2-6be9-4a1e-b815-ed104cca25cf)

### Login Screen
![Login Screen](https://github.com/user-attachments/assets/34dfaa71-c07c-442d-8d32-e9b5fef55ea9)

### Room Submision Form
![Room Submision Form](https://github.com/user-attachments/assets/fa44eadf-437f-4576-901f-fce975875d5d)

### My PG view
![My PG view](https://github.com/user-attachments/assets/78afb442-6b11-4db9-9bb6-9a41e3fb12a8)


## 📂 Project Structure
```bash
MessFinder/
├── src/
│   ├──components/
│   │   ├── error/
│   │   │   ├── error.jsx
│   │   │   └── index.jsx
│   │   ├── layout/
│   │   │   ├── footer.jsx
│   │   │   ├── header.jsx
│   │   │   └── index.jsx
│   │   ├── owner-form/
│   │   │   ├── AccommodationDetails.jsx
│   │   │   ├── FormButtons.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── index.jsx
│   │   │   └── MessDetails.jsx
│   │   └── ui/
│   │       ├── alert.jsx
│   │       ├── button.jsx
│   │       ├── index.jsx
│   │       ├── input.jsx
│   │       ├── loader.jsx
│   │       ├── logo.jsx
│   │       ├── option.jsx
│   │       └── set-role.jsx
│   ├── context/
│   │   ├── firebase.jsx
│   │   ├── firebase-config.js
│   │   ├── firebase-rtb.jsx
│   │   ├── firebase-storage.jsx
│   │   └── useGoogleAuth.jsx
│   ├── module/
│   │   ├── css/
│   │   └── js/
│   │       ├── district-pin.js
│   │       ├── navItems.js
│   │       ├── relative-time.js
│   │       └── string.js
│   └── pages/
│       ├── auth/
│       │   ├── index.jsx
│       │   ├── login.jsx
│       │   ├── logout.jsx
│       │   ├── register.jsx
│       │   └── reset.jsx
│       ├── dashboard/
│       │   ├── bookmarks.jsx
│       │   ├── dashboard.jsx
│       │   ├── index.jsx
│       │   ├── messages.jsx
│       │   ├── owner/
│       │   │   ├── mypgs.jsx
│       │   │   └── submit-pg.jsx
│       │   ├── profile.jsx
│       │   └── settings.jsx
│       ├── home/
│       │   ├── homeSearch.jsx
│       │   └── index.jsx
│       ├── info/
│       │   ├── about.jsx
│       │   ├── contact.jsx
│       │   ├── faqs.jsx
│       │   ├── index.jsx
│       │   ├── report.jsx
│       │   └── terms.jsx
│       ├── profile/
│       │   ├── index.jsx
│       │   └── publicProfile.jsx
│       └── rooms/
│           ├── index.jsx
│           ├── room.jsx
│           └── search.jsx
├── index.css
├── Layout.jsx
├── main.jsx
├── routes.jsx
├── scroll-to-top.jsx
├── public/
│   └── ... # (images, favicon, logo, etc.)
├── index.html
├── LICENSE
├── README.md
└── ... # (all other configuration and integration files)
```

## 🛠️ Technologies Used
**Frontend:** HTML, CSS, JavaScript, React, TailwindCSS

**Backend:** Firebase, Firebase.auth, Firebase.storage, Firebase.database

**Authentication:** Firebase Auth

**Deployment:** Vercel for frontend

## ⚙️ Setup Instructions

1. Clone the Repository
```bash
git clone https://github.com/h4jack/MessFinder.git
cd MessFinder
```
2. Install Dependencies
Navigate to the client directory and install dependencies:

```
cd client
npm install
```

3. Configure Environment Variables
Create a .env file in the client directory with the following content:

```env
# Firebase Keys..

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://project_id-default-rtdb.asia-southeast1.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=project_id
VITE_FIREBASE_STORAGE_BUCKET=project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=1:your_sender_id:web:app_id
VITE_FIREBASE_MEASUREMENT_ID=your_management_id
```
Replace with your_firebase_credentials and your_jwt_secret_key with your actual MongoDB URI and a secret key for JWT authentication.

4. Run the Application

```bash
npm run dev
```

The application should now be running locally.


## Authors

- [@h4jack](https://www.github.com/h4jack)


## Documentation

[Documentation](https://mess-finder.vercel.app/info/docs/)


## License

[MIT](https://github.com/h4jack/MessFinder/tree/dev?tab=License-1-ov-file)
