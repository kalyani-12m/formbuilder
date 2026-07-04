const BASE = "http://127.0.0.1:5000/api";

async function request(url, options) {
  try {
    const res = await fetch(url, options);

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        error: data?.error || "Request failed",
        status: res.status,
      };
    }

    return data;
  } catch (err) {
    return {
      error: "Network error. Is backend running?",
    };
  }
}

// REGISTER
export const registerUser = (data) => {
  return request(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// LOGIN
export const loginUser = (data) => {
  return request(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
export const createForm = async (data) => {
  try {
    const res = await fetch(`${BASE}/forms/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return { error: result?.error || "Failed to create form" };
    }

    return result;
  } catch (err) {
    return { error: "Backend not reachable" };
  }
};

export const submitResponse = async (data) => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/responses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
    return { error: "Failed to submit response" };
  }
};