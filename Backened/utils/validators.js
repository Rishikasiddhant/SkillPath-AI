// Function to validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Function to validate password length (minimum 6 characters)
export const isValidPassword = (password) => {
    return password && password.length >= 6;
};