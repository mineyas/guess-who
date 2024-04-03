export async function apiCall(endpoint, method, data = null) {
  const url = `${process.env.BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong");
    }

    return responseData;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}
