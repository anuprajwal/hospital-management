const BASE_URL = "http://127.0.0.1:5000/price"; // Update this with your actual API base URL if needed

const getAuthHeader = () => {
    const token = localStorage.getItem("user_auth");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
};

export const getPrices = async (page = 1, limit = 10, name = '', status = '') => {
    // Convert boolean/all status to API expected true/false
    let statusQuery = '';
    if (status === 'active') statusQuery = 'true';
    if (status === 'inactive') statusQuery = 'false';

    const response = await fetch(
        `${BASE_URL}/get-prices?page=${page}&limit=${limit}&name=${name}&status=${statusQuery}`, {
            headers: getAuthHeader()
        }
    );
    return await response.json();
};

export const createPrice = async (data) => {
    const response = await fetch(`${BASE_URL}/create-price`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const editPrice = async (pricing_id, data) => {
    const response = await fetch(`${BASE_URL}/edit-price/${pricing_id}`, {
        method: "PUT",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const deletePrice = async (pricing_id) => {
    const response = await fetch(`${BASE_URL}/delete-prices/${pricing_id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
    });
    return await response.json();
};