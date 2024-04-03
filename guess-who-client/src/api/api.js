
export async function apiCall(endpoint, method, data = null) {
  const url = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
  console.log(process.env.REACT_APP_BASE_URL, 'urlll')
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
