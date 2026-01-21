const API_URL = `${import.meta.env.VITE_API_URL}/api`;
// const API_URL = 'http://localhost:5000/api';

export const getJobs = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.keyword) params.append('keyword', filters.keyword);
  if (filters.experienceLevel) params.append('experienceLevel', filters.experienceLevel);
  if (filters.sort) params.append('sort', filters.sort);
  if (filters.page) params.append('page', filters.page);
  if (filters.limit) params.append('limit', filters.limit);

  const res = await fetch(`${API_URL}/jobs?${params.toString()}`);
  
  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { message: await res.text() };
  }

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch jobs');
  }
  return data;
};

export const getJobById = async (id) => {
  const res = await fetch(`${API_URL}/jobs/${id}`);

  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { message: await res.text() };
  }

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch job');
  }
  return data;
};

export const getMyApplications = async (token) => {
  const res = await fetch(`${API_URL}/jobs/applications`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { message: await res.text() };
  }

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch applications');
  }
  return data;
};

export const withdrawApplication = async (applicationId, token) => {
  const res = await fetch(`${API_URL}/jobs/applications/${applicationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { message: await res.text() };
  }

  if (!res.ok) {
    throw new Error(data.message || 'Failed to withdraw application');
  }
  return data;
};

export const applyToJob = async (jobId, resumeId, token) => {
  const res = await fetch(`${API_URL}/jobs/${jobId}/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ resumeId }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to apply');
  }
  return data;
};
