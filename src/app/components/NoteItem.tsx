'use client'

import { useState } from 'react'
import { updateNote, deleteNote } from '@/app/actions'

export default function NoteItem({ note }: { note: any }) {
  const [isEditing, setIsEditing] = useState(false)

  // This wrapper function allows us to update the DB *and* close the edit mode
  const handleUpdate = async (formData: FormData) => {
    await updateNote(formData)
    setIsEditing(false)
  }

  // MODE 1: EDITING
  if (isEditing) {
    return (
      <form action={handleUpdate} className="flex gap-2 items-center w-full">
        <input type="hidden" name="id" value={note.id} />
        <input 
          name="title" 
          defaultValue={note.title} 
          className="border p-2 rounded flex-1 text-black"
          autoFocus 
        />
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
          Save
        </button>
        <button 
          type="button" 
          onClick={() => setIsEditing(false)}
          className="bg-gray-400 text-white px-3 py-1 rounded"
        >
          Cancel
        </button>
      </form>
    )
  }

  // MODE 2: VIEWING
  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-black dark:text-white">{note.title}</span>
      <div className="flex gap-2">
        <button 
          onClick={() => setIsEditing(true)} 
          className="text-blue-500 hover:underline text-sm"
        >
          Edit
        </button>
        
        <form action={deleteNote}>
          <input type="hidden" name="id" value={note.id} />
          <button className="text-red-500 hover:underline text-sm">
            Delete
          </button>
        </form>
      </div>
    </div>
  )
}