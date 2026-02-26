const BASE_URL = "http://127.0.0.1:5000/patient";

const getAuthHeader = () => {
    const token = localStorage.getItem("user_auth");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
};

export const createTests = async (testData) => {
    const response = await fetch(`${BASE_URL}/create-tests`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(testData),
    });
    return await response.json();
};

// apis.js

export const getTests = async (params = {}) => {
    const queryParams = new URLSearchParams();

    // 🔹 Required for your controller to filter by patient
    if (params.patient_id) queryParams.append("patient_id", params.patient_id);

    // 🔹 Pagination (Ensure they are positive integers as per controller validation)
    queryParams.append("page", Math.max(1, parseInt(params.page || 1)));
    queryParams.append("limit", Math.max(1, parseInt(params.limit || 10)));

    const response = await fetch(`${BASE_URL}/get-tests?${queryParams.toString()}`, {
        method: "GET",
        headers: getAuthHeader(),
    });

    return await response.json();
};

export const deleteTest = async (test_id) => {
    const response = await fetch(`${BASE_URL}/delete-test/${test_id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
    });
    return await response.json();
};



export const createPrescription = async (prescriptionData) => {
    const response = await fetch(`${BASE_URL}/create-prescription`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(prescriptionData),
    });
    return await response.json();
};

export const editPrescription = async (prescription_id, prescriptionData) => {
    const response = await fetch(`${BASE_URL}/edit-prescription/${prescription_id}`, {
        method: "PUT",
        headers: getAuthHeader(),
        body: JSON.stringify(prescriptionData),
    });
    return await response.json();
};

export const deletePrescription = async (prescription_id) => {
    const response = await fetch(`${BASE_URL}/delete-prescription/${prescription_id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
    });
    return await response.json();
};

export const getPatientPrescriptions = async (patient_id) => {
    const response = await fetch(`${BASE_URL}/prescriptions/${patient_id}`, {
        method: "GET",
        headers: getAuthHeader(),
    });
    return await response.json();
};