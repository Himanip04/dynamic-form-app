import { api } from "./api";

export const fetchSchema = async () => {
  const res = await api.get("/schema");
  return res.data;
};

export const submitForm = async (payload) => {
  const res = await api.post("/submissions", payload);
  return res.data;
};


export const fetchPaginatedSubmissions = async ({ page, limit, sortBy, sortOrder }) => {
  const res = await api.get("/submissions/paginated", {
    params: { page, limit, sortBy, sortOrder },
  });
  return res.data;
};
