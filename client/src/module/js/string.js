const validateIndianPhoneNumber = (phone) => {
    // Remove spaces or dashes
    phone = phone.replace(/[\s-]/g, '');

    // If length is 10, check valid Indian mobile number
    if (phone.length === 10) {
        return /^[6-9]\d{9}$/.test(phone);
    }

    // If length is 12, check if it starts with '91' followed by a valid 10-digit number
    if (phone.length === 12) {
        return /^91[6-9]\d{9}$/.test(phone);
    }

    // If length is 13, check if it starts with '+91' followed by a valid 10-digit number
    if (phone.length === 13) {
        return /^\+91[6-9]\d{9}$/.test(phone);
    }

    // If none of the conditions match, return false
    return false;
}

const isAgeAboveLimit = (dobString, ageLimit = 18) => {
    const dob = new Date(dobString);
    const today = new Date();

    if (isNaN(dob)) return false; // Invalid date

    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    const d = today.getDate() - dob.getDate();

    // Adjust if birthday hasn't occurred yet this year
    const isBirthdayPassed = m > 0 || (m === 0 && d >= 0);
    const actualAge = isBirthdayPassed ? age : age - 1;

    return actualAge >= ageLimit;
}

const validateUsername = (username) => {
    // Check length
    if (username.length < 6 || username.length > 16) {
        return {
            status: false,
            message: "Username must be between 6 and 16 characters long.",
        };
    }

    // Check start character
    if (!/^[a-z]/.test(username)) {
        return {
            status: false,
            message: "Username must start with a lowercase English letter.",
        };
    }

    // Check allowed characters
    if (!/^[a-z0-9_]+$/.test(username)) {
        return {
            status: false,
            message: "Username can only contain lowercase letters, numbers, and underscores.",
        };
    }

    return {
        status: true,
        message: "Valid username",
    };
}


const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
    validateIndianPhoneNumber,
    isAgeAboveLimit,
    validateUsername,
    capitalize,
};