import API from "../api/axios"

export const applyJob = async (jobId) => {
    const res = await API.post("/applications", { jobId: jobId });
    return res.data;
};

export const getMyApplicatons = async() => {
    const res = await API.get("/applications/my");
    return res.data;
};

export const getApplicationsByJob = async (jobId) => {

  const res = await API.get(`/applications/jobs/${jobId}`);

  return res.data;
};

export const getApplicationsForMyJobs = async () => {
  const res = await API.get("/applications/employer");
  return res.data;
};