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


const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export { capitalize, validateIndianPhoneNumber };