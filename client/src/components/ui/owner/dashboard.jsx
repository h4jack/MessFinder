import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
            {location.pathname === "/dashboard:" ? <DashboardHome /> : <Outlet />}
        </main>
    );
};

// Components for each route
export const DashboardHome = () => (
    <div>
        <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
        <p>Here is an overview of your activities.</p>
    </div>
);

export const MyPGs = () => {
    <div>
        <h2 className="text-2xl font-bold">My PGs</h2>
        <p>List of My PGs.</p>
    </div>
};


export const SubmitPG = () => (
    <div>
        <h2 className="text-2xl font-bold">Submit a New PG</h2>
        <p>Form to submit a new PG.</p>
    </div>
);

export const Settings = () => (
    <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p>Manage your account settings.</p>
    </div>
);

export const Profile = () => (
    <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p>View and edit your profile information.</p>
    </div>
);

export default Dashboard;