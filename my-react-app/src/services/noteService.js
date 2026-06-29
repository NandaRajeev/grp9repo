import api from "./api";

export const getNotes   = (params) => api.get("/notes", { params });
export const getStats   = ()       => api.get("/notes/stats");
export const createNote = (data)   => api.post("/notes", data);
export const updateNote = (id, data) => api.put(`/notes/${id}`, data);
export const deleteNote = (id)     => api.delete(`/notes/${id}`);
