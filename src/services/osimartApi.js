const STORE_ID = "8d799051-7106-4ba5-b41f-823690e08bba";
const BASE_URL = "https://api.osimart.com/store/apis";

async function fetchData(endpoint) {
  const url = `${BASE_URL}/${endpoint}/?store=${STORE_ID}`;
  console.log("Fetching OSIMART:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("OSIMART API failed:", response.status, text);
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return await response.json();
}

export async function getBanners() {
  const data = await fetchData("banners");
  console.log("Raw banners response:", data);
  return data.results || data;
}

export async function getProducts() {
  const data = await fetchData("products");
  console.log("Raw products response:", data);
  return data.results || data;
}
