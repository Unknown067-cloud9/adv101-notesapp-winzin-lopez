"use client";

import React from "react";

export interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
}

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function NoteItem({ note, onDelete, onEdit }: NoteItemProps) {
  return (
    <div className="bg-[#232527] border border-[#393B3D] hover:border-[#00A2FF] rounded-xl p-5 shadow-lg transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Category Badge & Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-[#191B1D] text-[#00A2FF] text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-[#393B3D]">
            {note.category || "General"}
          </span>
          <span className="text-[11px] font-semibold text-[#8A8C8E]">
            {note.createdAt}
          </span>
        </div>

        {/* Note Title */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-[#00A2FF] transition-colors">
          {note.title}
        </h3>

        {/* Note Description */}
        <p className="text-[#B8B9BA] text-xs leading-relaxed whitespace-pre-wrap mb-5 line-clamp-4 font-normal">
          {note.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#2F3133]">
        <button
          onClick={() => onEdit(note)}
          className="px-3 py-1 text-xs font-bold text-[#E8E8E8] bg-[#393B3D] hover:bg-[#00A2FF] hover:text-white rounded-md transition-all"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-3 py-1 text-xs font-bold text-[#FF6666] bg-[#393B3D] hover:bg-[#F52525] hover:text-white rounded-md transition-all"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}