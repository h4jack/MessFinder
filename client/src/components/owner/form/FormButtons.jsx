import React from 'react';
import { Button } from "../../ui/button"; // Assuming Button is a reusable component

const FormButtons = () => {
    return (
        <div className="flex justify-between gap-3">
            <Button
                text="Cancel"
                className="sm:max-w-1/4 bg-gray-300 text-gray-700"
                type="button"
            />
            <Button
                text="Draft"
                className="sm:max-w-1/4 bg-yellow-500 text-white"
                type="button"
            />
            <Button
                text="Submit"
                className="sm:max-w-1/4 bg-blue-500 text-white"
                type="submit"
            />
        </div>
    );
};

export default FormButtons;
