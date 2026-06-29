import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../components/Navbar";
import * as noteService from "../services/noteService";
import { useApi } from "../services/api";

const STATUSES = ["Pending", "In Progress", "Completed"];

// ── Helpers ────────────────────────────────────────────────────
const statusClass = (s) => s.replace(" ", "-");

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

// ── useCountUp ─────────────────────────────────────────────────
function useCountUp(target, duration = 900) {
  const [count, setCount] = useState(0);
  const raf  = useRef(null);
  const prev = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const from  = prev.current;
    const delta = target - from;
    prev.current = target;

    const animate = (now) => {
      const t      = Math.min((now - start) / duration, 1);
      const eased  = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(from + eased * delta));
      if (t < 1) raf.current = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return count;
}

// ── useToast ────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const id = useRef(0);

  const push = useCallback((msg, type = "info", duration = 3000) => {
    const key = ++id.current;
    setToasts((t) => [...t, { key, msg, type, duration }]);
    setTimeout(() => {
      setToasts((t) => t.map((x) => (x.key === key ? { ...x, exiting: true } : x)));
      setTimeout(() => setToasts((t) => t.filter((x) => x.key !== key)), 300);
    }, duration);
  }, []);

  return { toasts, push };
}

// ── Confetti ────────────────────────────────────────────────────
const CONFETTI_COLORS = [
  "#7c6bff", "#22c55e", "#f59e0b", "#3b82f6",
  "#ec4899", "#a99dff", "#f43f5e", "#06b6d4",
];

function Confetti({ trigger }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const p = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 0.4,
      duration: 0.9 + Math.random() * 0.8,
      size: 7 + Math.random() * 8,
      drift: (Math.random() - 0.5) * 200,
      shape: Math.random() > 0.5 ? "50%" : "2px",
    }));
    setParticles(p);
    const t = setTimeout(() => setParticles([]), 2400);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!particles.length) return null;

  return (
    <div className="confetti-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: p.size, height: p.size,
            borderRadius: p.shape,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

// ── StatCard ────────────────────────────────────────────────────
function StatCard({ type, label, icon, value, pct }) {
  const animated = useCountUp(value);
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
          <div className="stat-label">{label}</div>
          <div className="stat-value">{animated}</div>
        </div>
      </div>
      <div className="stat-bar-wrap">
        <div className="stat-bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── SkeletonCard ────────────────────────────────────────────────
function SkeletonCard({ delay = 0 }) {
  return (
    <div className="skeleton-card" style={{ animationDelay: `${delay}s` }}>
      <div className="skeleton" style={{ height: 18, width: "70%" }} />
      <div className="skeleton" style={{ height: 14, width: "100%", marginTop: 4 }} />
      <div className="skeleton" style={{ height: 14, width: "88%" }} />
      <div className="skeleton" style={{ height: 14, width: "60%" }} />
      <div className="skeleton" style={{ height: 1, marginTop: 8 }} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <div className="skeleton" style={{ height: 22, width: 80, borderRadius: 20 }} />
        <div className="skeleton" style={{ height: 14, width: 70 }} />
      </div>
    </div>
  );
}

// ── NoteCard ────────────────────────────────────────────────────
function NoteCard({ note, index, onEdit, onDelete, onStatusChange }) {
  const sc    = statusClass(note.status);
  const delay = `${Math.min(index * 0.06, 0.5)}s`;

  return (
    <div className={`note-card ${sc}`} style={{ animationDelay: delay }}>
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button className="icon-btn" title="Edit note" onClick={() => onEdit(note)} aria-label="Edit note">
            ✏️
          </button>
          <button className="icon-btn delete" title="Delete note" onClick={() => onDelete(note._id)} aria-label="Delete note">
            🗑️
          </button>
        </div>
      </div>

      <p className="note-description">{note.description}</p>

      <div className="note-footer">
        <select
          className={`status-badge ${sc}`}
          value={note.status}
          onChange={(e) => onStatusChange(note._id, e.target.value)}
          aria-label="Change status"
          style={{ cursor: "pointer", border: "none", outline: "none", appearance: "none" }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s} style={{ background: "#1a1e35", color: "#eef0ff" }}>
              {s}
            </option>
          ))}
        </select>
        <span className="note-date">{formatDate(note.createdAt)}</span>
      </div>
    </div>
  );
}

// ── NoteModal ────────────────────────────────────────────────────
function NoteModal({ mode, note, onClose, onSave }) {
  const [title,       setTitle]       = useState(note?.title ?? "");
  const [description, setDescription] = useState(note?.description ?? "");
  const [status,      setStatus]      = useState(note?.status ?? "Pending");
  const [saving,      setSaving]      = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSaving(true);
    await onSave({ title: title.trim(), description: description.trim(), status });
    setSaving(false);
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog" aria-modal="true" aria-labelledby="modal-title"
    >
      <div className="modal">
        <div className="modal-header">
          <h2 id="modal-title">{mode === "edit" ? "✏️ Edit Note" : "✨ New Note"}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">×</button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-input" type="text"
              placeholder="What's this note about?" value={title}
              onChange={(e) => setTitle(e.target.value)}
              required autoFocus maxLength={120}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Add details, context, or steps…" value={description}
              onChange={(e) => setDescription(e.target.value)}
              required maxLength={2000}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status} onChange={(e) => setStatus(e.target.value)}
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit" className="btn btn-primary"
              disabled={saving || !title.trim() || !description.trim()}
            >
              {saving ? "⏳ Saving…" : mode === "edit" ? "💾 Save Changes" : "✨ Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────
export default function Dashboard() {
  const api = useApi(); // Clerk-authenticated axios instance
  const [notes,    setNotes]    = useState([]);
  const [stats,    setStats]    = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("All");
  const [search,   setSearch]   = useState("");
  const [modal,    setModal]    = useState(null);
  const [confetti, setConfetti] = useState(0);
  const { toasts, push }        = useToast();
  const searchTimer             = useRef(null);

  const total    = stats.total || 1;
  const statCards = [
    { type: "total",     label: "Total",       icon: "📋", value: stats.total,      pct: 100 },
    { type: "pending",   label: "Pending",     icon: "⏳", value: stats.pending,    pct: Math.round((stats.pending    / total) * 100) },
    { type: "progress",  label: "In Progress", icon: "🔄", value: stats.inProgress, pct: Math.round((stats.inProgress / total) * 100) },
    { type: "completed", label: "Completed",   icon: "✅", value: stats.completed,  pct: Math.round((stats.completed  / total) * 100) },
  ];

  // ── API helpers ────────────────────────────────────────────
  const fetchNotes = useCallback(async (statusFilter, searchQ) => {
    try {
      const params = {};
      if (statusFilter && statusFilter !== "All") params.status = statusFilter;
      if (searchQ) params.search = searchQ;
      const { data } = await noteService.getNotes(api, params);
      setNotes(data);
    } catch (err) {
      push(err.response?.data?.message || "Failed to load notes", "error");
    }
  }, [api, push]);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await noteService.getStats(api);
      setStats(data);
    } catch { /* silent */ }
  }, [api]);

  const refresh = useCallback(async (sf = filter, sq = search) => {
    await Promise.all([fetchNotes(sf, sq), fetchStats()]);
  }, [fetchNotes, fetchStats, filter, search]);

  // ── Boot ───────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoading(true);
      await refresh("All", "");
      setLoading(false);
    })();
  }, []); // eslint-disable-line

  // ── Filter ─────────────────────────────────────────────────
  const handleFilter = (f) => {
    setFilter(f);
    fetchNotes(f, search);
  };

  // ── Search (debounced) ─────────────────────────────────────
  const handleSearch = (val) => {
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchNotes(filter, val), 350);
  };

  // ── CRUD ───────────────────────────────────────────────────
  const handleCreate = async ({ title, description, status }) => {
    try {
      await noteService.createNote(api, { title, description, status });
      setModal(null);
      await refresh();
      push("Note created! 🎉", "success");
      if (status === "Completed") setConfetti((c) => c + 1);
    } catch (err) {
      push(err.response?.data?.message || "Failed to create note", "error");
    }
  };

  const handleUpdate = async ({ title, description, status }) => {
    try {
      await noteService.updateNote(api, modal.note._id, { title, description, status });
      setModal(null);
      await refresh();
      push("Note updated! ✨", "success");
    } catch (err) {
      push(err.response?.data?.message || "Failed to update note", "error");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await noteService.updateNote(api, id, { status: newStatus });
      await refresh();
      if (newStatus === "Completed") {
        setConfetti((c) => c + 1);
        push("Marked as Completed! 🎊", "success");
      } else {
        push(`Status → ${newStatus}`, "info");
      }
    } catch (err) {
      push(err.response?.data?.message || "Failed to update status", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await noteService.deleteNote(api, id);
      await refresh();
      push("Note deleted", "info");
    } catch (err) {
      push(err.response?.data?.message || "Failed to delete note", "error");
    }
  };

  const filters = [
    { label: "All",         cls: "" },
    { label: "Pending",     cls: "pending" },
    { label: "In Progress", cls: "progress" },
    { label: "Completed",   cls: "completed" },
  ];

  return (
    <div className="app">
      <Navbar total={stats.total} />

      <main className="main">
        {/* Stats */}
        <div className="stats-grid" role="region" aria-label="Statistics">
          {statCards.map((c) => <StatCard key={c.type} {...c} />)}
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              className="search-input" type="search"
              placeholder="Search notes…" value={search}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search notes"
            />
          </div>

          <div className="filter-group" role="group" aria-label="Filter by status">
            {filters.map((f) => (
              <button
                key={f.label}
                className={`filter-btn ${f.cls} ${filter === f.label ? "active" : ""}`}
                onClick={() => handleFilter(f.label)}
                aria-pressed={filter === f.label}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button className="add-btn" onClick={() => setModal({ mode: "create" })}>
            <span>+</span> New Note
          </button>
        </div>

        {/* Notes */}
        <section className="notes-section" aria-label="Notes">
          <div className="section-header">
            <span className="section-title">Notes</span>
            <span className="notes-count">{notes.length}</span>
          </div>

          {loading ? (
            <div className="notes-grid">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} delay={i * 0.07} />)}
            </div>
          ) : notes.length === 0 ? (
            <div className="notes-grid">
              <div className="empty-state">
                <div className="empty-icon" aria-hidden="true">{search ? "🔍" : "📭"}</div>
                <h3>{search ? "No results found" : "No notes yet"}</h3>
                <p>
                  {search
                    ? `Nothing matched "${search}". Try a different term.`
                    : "Create your first note to start tracking your tasks."}
                </p>
                {!search && (
                  <button className="empty-add-btn" onClick={() => setModal({ mode: "create" })}>
                    <span>+</span> Create Note
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note, i) => (
                <NoteCard
                  key={note._id} note={note} index={i}
                  onEdit={(n) => setModal({ mode: "edit", note: n })}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal */}
      {modal && (
        <NoteModal
          mode={modal.mode}
          note={modal.note}
          onClose={() => setModal(null)}
          onSave={modal.mode === "edit" ? handleUpdate : handleCreate}
        />
      )}

      {/* Confetti */}
      <Confetti trigger={confetti} />

      {/* Toasts */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.key} className={`toast ${t.type}${t.exiting ? " exit" : ""}`}>
            <div className="toast-body">
              <span className="toast-icon">
                {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}
              </span>
              <span>{t.msg}</span>
            </div>
            <div className="toast-progress" style={{ animationDuration: `${t.duration}ms` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
