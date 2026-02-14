const BASE_URL = "http://127.0.0.1:5000";

const getHeaders = () => {
    const token = localStorage.getItem('user_auth');
    if (!token) throw new Error("No authentication token found. Please log in.");
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const fetchAvailableModules = async () => {
    const response = await fetch(`${BASE_URL}/module/get-available-modules`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch modules");
    return await response.json();
};

export const saveFormConfig = async (formData, isUpdate = false) => {
    const response = await fetch(`${BASE_URL}/module/form-edit`, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: getHeaders(),
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to save form");
    return data;
};

// Fetching existing forms for the module
export const fetchAvailableForms = async (moduleId) => {
    const response = await fetch(`${BASE_URL}/module/get-available-forms?module_id=${moduleId}`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch forms");
    return await response.json();
};