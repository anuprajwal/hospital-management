const BASE_URL = 'http://127.0.0.1:5000';

const getAuthHeaders = () => {
    const token = localStorage.getItem('user_auth');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const fetchModulesByRole = async () => {
    try {
        const response = await fetch(`${BASE_URL}/module/forms/by-role`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch modules');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// 1. Create Outpatient
export const createOutpatient = async (formId, formData) => {
    const response = await fetch(`${BASE_URL}/patient/create-outpatient`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            patient_name: `${formData['Sur name']} ${formData['patient name']}`,
            form_data: JSON.stringify(formData)
        }),
    });
    if (!response.ok) throw new Error('Failed to create patient');
    return await response.json();
};

// 2. Edit Outpatient
export const editOutpatient = async (outpatientId, formData) => {
    const response = await fetch(`${BASE_URL}/patient/edit-outpatient/${outpatientId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            form_data: JSON.stringify(formData),
            patient_name: `${formData['Sur name']} ${formData['patient name']}`,
        }),
    });
    if (!response.ok) throw new Error('Failed to update patient');
    return await response.json();
};

// 3. Get Outpatients with Pagination
export const getOutpatients = async (page = 1, limit = 10, search = '', status = '') => {
    try {
        // Construct query parameters
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(search && {
                search
            }),
            ...(status && {
                status
            })
        });

        const response = await fetch(`${BASE_URL}/patient/get-outpatients?${params.toString()}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) throw new Error('Failed to fetch patients');
        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
};

// 4. Delete Outpatient
export const deleteOutpatient = async (id) => {
    const response = await fetch(`${BASE_URL}/patient/delete-outpatient/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete patient');
    return await response.json();
};

// 5. Move to Inpatient
export const moveToInpatient = async (userId) => {
    const response = await fetch(`${BASE_URL}/patient/outpatient/move-to-inpatient`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            user_id: userId
        }),
    });
    if (!response.ok) throw new Error('Failed to transfer patient');
    return await response.json();
};