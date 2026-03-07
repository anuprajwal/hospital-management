const BASE_URL = 'http://127.0.0.1:5000/pharmacy';

/**
 * Common request wrapper to handle auth and response parsing
 */
const request = async (endpoint, options = {}) => {
    const token = localStorage.getItem('user_auth');

    const defaultHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Handle 204 No Content for DELETE requests
    if (response.status === 204) return null;

    return response.json();
};

/**
 * api2 -> Fetch drugs with pagination and filters
 * Used in: ViewMedicine.jsx
 */
export const getDrugs = async (filters = {}) => {
    const {
        page = 1, limit = 10, name, manufacturer, expiry_before
    } = filters;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(name && {
            name
        }),
        ...(manufacturer && {
            manufacturer
        }),
        ...(expiry_before && {
            expiry_before
        }),
    });

    return request(`/drugs?${queryParams}`);
};

/**
 * api1 -> Add a new drug
 * Used in: AddMedicine.jsx
 */
export const addDrug = async (drugData) => {
    return request('/drugs', {
        method: 'POST',
        body: JSON.stringify({
            ...drugData,
            meta_data: drugData.meta_data || {},
        }),
    });
};

/**
 * api3 -> Update an existing drug
 * Used in: AddMedicine.jsx
 */
export const updateDrug = async (drugId, drugData) => {
    return request(`/drugs/${drugId}`, {
        method: 'PUT',
        body: JSON.stringify({
            ...drugData,
            meta_data: drugData.meta_data || {},
        }),
    });
};

/**
 * api4 -> Delete a drug
 * Used in: ViewMedicine.jsx
 */
export const deleteDrug = async (drugId) => {
    return request(`/drugs/${drugId}`, {
        method: 'DELETE',
    });
};

/**
 * Fetch Prescription Queue
 * Used in: ViewPrescriptions.jsx
 */
export const getPrescriptionQueue = async () => {
    return request('/prescriptions/queue');
};

/**
 * Fetch all prescriptions with pagination and patient filtering
 * Used in: ViewPrescriptions.jsx
 */
export const getPrescriptions = async (filters = {}) => {
    const {
        page = 1, limit = 10, patient_name
    } = filters;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(patient_name && {
            patient_name
        }),
    });

    return request(`/prescriptions?${queryParams}`);
};

/**
 * Search for a specific drug by name to find matches for prescriptions
 */
export const searchDrugByName = async (name) => {
    // We use the existing getDrugs logic but filtered by exact name
    const response = await getDrugs({
        name,
        limit: 1
    });
    return response.data && response.data.length > 0 ? response.data[0] : null;
};