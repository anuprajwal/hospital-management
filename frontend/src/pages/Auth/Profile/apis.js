const BASE_URL = "http://127.0.0.1:5000";

const getHeaders = () => {
    const token = localStorage.getItem('user_auth');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const updatePassword = async (newPassword) => {
    const response = await fetch(`${BASE_URL}/profile/change-password`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
            newPassword
        }),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to update password");
    }
    return response.json();
};

export const updateUsername = async (username) => {
    const response = await fetch(`${BASE_URL}/profile/change-username`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
            username
        }),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to update username");
    }
    return response.json();
};