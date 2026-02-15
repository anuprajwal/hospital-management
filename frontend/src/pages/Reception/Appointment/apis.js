const BASE_URL = 'http://localhost:5000'

console.log('qewsjfkh', BASE_URL)


export const fetchModulesByRole = async () => {
    try {
        const token = localStorage.getItem('user_auth');

        const response = await fetch(`${BASE_URL}/module/forms/by-role`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch modules');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};