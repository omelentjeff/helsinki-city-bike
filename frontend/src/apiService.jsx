// src/apiService.js
export const fetchData = async (endpoint, page = 0) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/${endpoint}?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    throw error;
  }
};
