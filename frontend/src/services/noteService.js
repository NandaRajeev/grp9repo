import api from "./api";

const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getNotes = (token, params) =>
  api.get("/notes", {
    ...authHeader(token),
    params,
  });

export const getStats = (token) =>
  api.get("/notes/stats", authHeader(token));

export const createNote = (token, data) =>
  api.post("/notes", data, authHeader(token));

export const updateNote = (token, id, data) =>
  api.put(`/notes/${id}`, data, authHeader(token));

export const deleteNote = (token, id) =>
  api.delete(`/notes/${id}`, authHeader(token));