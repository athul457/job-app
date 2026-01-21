const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;
// const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  const contentType = response.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) throw new Error(data.message || "Login failed");
    return data;
  } catch (err) {
    // Retry once (Render wake-up)
    console.log("Retrying login due to possible timeout...");
    const retry = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    
    const contentType = retry.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await retry.json();
    } else {
      data = { message: await retry.text() };
    }
    
    if (!retry.ok) throw new Error(data.message || "Login failed after retry");
    return data;
  }
};

export const getMe = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${token}` 
    },
  });

  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user');
  }
  return data;
};
