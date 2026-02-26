const BASE_URL = 'http://127.0.0.1:5000';


const getHeaders = () => {
    const token = localStorage.getItem('user_auth');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};


export const updateTest = async (testId, payload) => {
    const response = await fetch(`${BASE_URL}/patient/edit-test/${testId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to update test');
    return await response.json();
};


export const fetchPatientTests = async ({
    status,
    search,
    page = 1,
    limit = 10
}) => {
    try {
        // 1. Get the token from localStorage
        const token = localStorage.getItem('user_auth');

        // 2. Construct Query Parameters
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (status && status !== 'all') params.append('status', status);
        if (search) params.append('search', search);

        // 3. Execute Request
        const response = await fetch(`${BASE_URL}/patient/get-tests?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add the Authorization header
                'Authorization': token ? `Bearer ${token}` : '',
            },
        });

        // 4. Handle non-200 responses
        if (!response.ok) {
            // Handle unauthorized (401) specifically if needed
            if (response.status === 401) {
                throw new Error('Session expired. Please login again.');
            }
            throw new Error('Failed to fetch tests');
        }

        const result = await response.json();

        // Returning the structure expected by the UI
        return {
            data: result.data || [],
            total: result.total || 0
        };

    } catch (error) {
        console.error("API Fetch Error:", error.message);
        throw error;
    }
};