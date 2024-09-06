const apiBaseUrl = import.meta.env.VITE_API_URL;

export const fetchData = async (
  endpoint,
  page = 0,
  pageSize = 10,
  sort = ""
) => {
  try {
    console.log("API Base URL:", apiBaseUrl); // Add this line to check the value
    const response = await fetch(
      `${apiBaseUrl}/${endpoint}?page=${page}&size=${pageSize}&sort=${sort}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    throw error;
  }
};

export const fetchAllData = async (endpoint) => {
  let allData = [];
  let page = 0;
  let pageSize = 10;
  let totalPages = 1;

  while (page < totalPages) {
    try {
      const response = await fetchData(endpoint, page, pageSize);
      allData = [...allData, ...response.content];
      totalPages = response.totalPages;
      page++;
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
      throw error;
    }
  }

  return allData;
};

export const fetchSingleData = async (endpoint, id) => {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    throw error;
  }
};
