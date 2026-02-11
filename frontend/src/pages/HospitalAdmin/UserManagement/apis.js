const BASE_URL = "http://127.0.0.1:5000";

// apis.js
export const fetchUsersOverview = async (params = {}) => {
    try {
        const token = localStorage.getItem('user_auth');

        // Build query string from params object
        const queryString = new URLSearchParams(params).toString();
        const url = `${BASE_URL}/users/overview${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data
        };
    } catch (error) {
        return {
            ok: false,
            status: "Network Error",
            data: error
        };
    }
};

export const changeUserStatus = async (userId, status) => {
    try {
        const token = localStorage.getItem('user_auth');

        const response = await fetch(`${BASE_URL}/users/change-status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: userId,
                status: status
            }),
        });
        const data = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data
        };
    } catch (error) {
        return {
            ok: false,
            status: "Network Error",
            data: error
        };
    }
};

export const deleteUserAccount = async (userId) => {
    try {
        const token = localStorage.getItem('user_auth');
        const response = await fetch(`${BASE_URL}/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data
        };
    } catch (error) {
        return {
            ok: false,
            status: "Network Error",
            data: error
        };
    }
};


// UserApis.js
export const createAccount = async (userData) => {
    const token = localStorage.getItem('user_auth');

    try {
        const response = await fetch(`${BASE_URL}/auth/create-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: userData.username, // mapping 'username' from form to 'name' for API
                password: userData.password,
                role: userData.role,
                status: userData.allowActivity ? "Approve" : "Frozen"
            }),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            status: response.status,
            data: data
        };
    } catch (error) {
        return {
            ok: false,
            status: "Network Error",
            data: {
                message: error.message || "Failed to connect to server"
            }
        };
    }
};