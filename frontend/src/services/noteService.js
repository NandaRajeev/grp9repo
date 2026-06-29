// noteService.js — all note API calls, now accepts an api instance
// (returned by useApi() hook) so the Clerk token is always fresh

export const getNotes   = (api, params)    => api.get("/notes", { params });
export const getStats   = (api)            => api.get("/notes/stats");
export const createNote = (api, data)      => api.post("/notes", data);
export const updateNote = (api, id, data)  => api.put(`/notes/${id}`, data);
export const deleteNote = (api, id)        => api.delete(`/notes/${id}`);
