import API from "../api/axios"

export const getJobs = async (page = 0, size = 5) => {

  const res = await API.get(`/jobs/paged?page=${page}&size=${size}`);

  return res.data;

};

export const searchJobsByLocation = async (location) => {

  const res = await API.get(`/jobs/search?location=${location}`);

  return res.data;

};

export const searchJobsBySkill = async (skill) => {

  const res = await API.get(`/jobs/search/skill?skill=${skill}`);

  return res.data;

};

export const createJob = async (data) => {
  const res = await API.post("/jobs", data);
  return res.data;
};