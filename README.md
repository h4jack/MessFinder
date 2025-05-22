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
└── client/                       # Frontend React application
    ├── public/                  # Static files served directly
    │   ├── assets/             # Image and SVG assets
    │   └── module/             # Optional modular CSS/JS
    ├── src/                     # Source code
    │   ├── components/         # All UI and functional components
    │   │   ├── auth/           # Login, register, reset components
    │   │   ├── error/          # Error pages or handlers
    │   │   ├── home/           # Home page related components
    │   │   ├── info/           # About, contact, FAQs, terms, etc.
    │   │   ├── layout/         # Header, footer, layout components
    │   │   ├── owner/          # Owner dashboard and PG submission
    │   │   │   └── form/       # Stepwise PG/Mess submission form
    │   │   ├── rooms/          # Room listing and search
    │   │   ├── ui/             # Reusable UI components like input, logo
    │   │   └── user/           # User-specific features like chat
    │   ├── context/            # Firebase and state context providers
    │   ├── module/             # Utility JS and modular CSS
    │   │   ├── js/             # Scripts (e.g., district-pin.js)
    │   ├── index.css           # Global styles
    │   ├── Layout.jsx          # App layout wrapper
    │   ├── main.jsx            # React app entry point
    │   └── scroll-to-top.js    # Scroll behavior component
    ├── .env                    # Environment variables
    ├── index.html              # HTML entry point for Vite
    
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
