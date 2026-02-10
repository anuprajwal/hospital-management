// authService.js
const BASE_URL = "http://127.0.0.1:5000"; // Replace with your actual base URL

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        // We return the status and the data so the UI can display it "as is"
        const data = await response.json();

        return {
            ok: response.ok,
            status: response.status,
            data: data
        };
    } catch (error) {
        return {
            ok: false,
            status: 'NETWORK_ERROR',
            data: {
                message: error.message || "Failed to connect to server"
            }
        };
    }
};