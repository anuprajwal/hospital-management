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

export const getTests = async () => {
    const response = await fetch(`${BASE_URL}/get-tests`, {
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