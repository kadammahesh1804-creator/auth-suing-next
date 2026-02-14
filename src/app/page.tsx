import { createClient } from './utils/supabase/server'
import { signout } from './login/actions'
import { addNote } from './actions'
import NoteItem from './components/NoteItem' // Import the new component
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: notes } = user 
    ? await supabase.from('notes').select('*').order('id', { ascending: false }) 
    : { data: [] }

  return (
    <div className="flex flex-col items-center min-h-screen gap-8 p-8 font-sans">
      <h1 className="text-4xl font-bold">My Notes App</h1>

      {user ? (
        <div className="w-full max-w-md flex flex-col gap-8">
          
          <form action={addNote} className="flex gap-2">
            <input 
              name="title" 
              placeholder="What's on your mind?" 
              className="border p-2 rounded flex-1 text-black" 
              required
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add
            </button>
          </form>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            
            {/* HERE IS THE CHANGE: We use the NoteItem component now */}
            {notes?.map((note) => (
              <div key={note.id} className="p-4 border rounded shadow-sm bg-gray-50 dark:bg-gray-800">
                <NoteItem note={note} />
              </div>
            ))}

            {notes?.length === 0 && (
              <p className="text-gray-500 text-center">No notes yet.</p>
            )}
          </div>

          <form action={signout} className="self-center">
            <button className="text-red-500 hover:underline text-sm">
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Login to create notes
          </Link>
        </div>
      )}
    </div>
  )
}