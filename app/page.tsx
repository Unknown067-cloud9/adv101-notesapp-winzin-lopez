"use client";

import { useState, useEffect } from "react";
import NoteItem, { Note } from "./components/NoteItem";

const CATEGORIES = ["General", "Scripting", "Builds", "Game Ideas", "UI Design"];

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Bonus 1: useEffect duplicate title check[cite: 1]
  useEffect(() => {
    if (!title.trim()) {
      setIsDuplicate(false);
      return;
    }

    const exists = notes.some(
      (note) =>
        note.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        note.id !== editingId
    );

    setIsDuplicate(exists);
  }, [title, notes, editingId]);

  // Submit Handler (Add / Update)[cite: 1]
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || isDuplicate) return;

    if (editingId) {
      // Update existing note[cite: 1]
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                description: description.trim(),
                category,
              }
            : note
        )
      );
      setEditingId(null);
    } else {
      // Add new note[cite: 1]
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        category,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    // Reset Input Fields
    setTitle("");
    setDescription("");
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
    setCategory(note.category);
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setDescription("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  return (
    <main className="min-h-screen bg-[#191B1D] text-[#E8E8E8] p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <header className="text-center py-6 border-b border-[#2F3133]">
          <div className="inline-flex items-center gap-2 bg-[#232527] border border-[#393B3D] px-4 py-1.5 rounded-md mb-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#00A2FF]" />
            <span className="text-xs font-bold tracking-wider text-[#B8B9BA] uppercase">
              Exercise 3
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Roblox Note Application
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#8A8C8E]">
            Note? Notebook HAHAHAHA
          </p>
        </header>

        <div className="bg-[#232527] border border-[#393B3D] rounded-2xl p-6 sm:p-8 shadow-2xl max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#2F3133]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#00A2FF]">{editingId ? "✏️" : "➕"}</span>
              {editingId ? "Edit Roblox Note" : "Create New Note"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-xs font-bold text-[#FF6666] bg-[#393B3D] hover:bg-[#F52525] hover:text-white px-3 py-1 rounded-md transition-all"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
           
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B8B9BA] mb-1.5">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg bg-[#191B1D] text-white border ${
                  isDuplicate
                    ? "border-[#F52525] focus:ring-1 focus:ring-[#F52525]"
                    : "border-[#393B3D] focus:border-[#00A2FF]"
                } outline-none text-sm transition-all font-medium placeholder-[#555759]`}
              />
              
              {isDuplicate && (
                <p className="mt-1.5 text-xs text-[#FF6666] font-semibold flex items-center gap-1">
                  
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B8B9BA] mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Write note description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#191B1D] text-white border border-[#393B3D] focus:border-[#00A2FF] outline-none text-sm transition-all font-medium placeholder-[#555759] resize-none"
              />
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B8B9BA] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#191B1D] text-white border border-[#393B3D] focus:border-[#00A2FF] text-xs font-semibold outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#232527] text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!title.trim() || !description.trim() || isDuplicate}
              className="w-full py-3 px-6 rounded-lg font-bold text-white bg-[#00A2FF] hover:bg-[#0088D6] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-[#00A2FF]/20"
            >
              {editingId ? "Update Note" : "Save Note"}
            </button>
          </form>
        </div>

        {/* View Created Notes Grid Section[cite: 1] */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-[#2F3133] pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              All Notes Created
            </h2>
            <span className="text-xs font-bold bg-[#232527] text-[#00A2FF] border border-[#393B3D] px-3 py-1 rounded-md">
              {notes.length} {notes.length === 1 ? "Note" : "Notes"}
            </span>
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-16 bg-[#232527]/50 rounded-2xl border border-dashed border-[#393B3D]">
              <p className="text-[#8A8C8E] font-medium text-sm">
                No notes created yet. Add a note above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}