'use server'

import { createClient } from './utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addNote(formData: FormData) {
  const supabase = await createClient()

  // We need the user's ID to associate the note with them
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return 
  }

  const title = formData.get('title') as string

  // Insert the note
  await supabase.from('notes').insert({
    title,
    user_id: user.id,
  })

  // This tells Next.js to refresh the home page so the new note appears immediately
  revalidatePath('/')
}
export async function deleteNote(formData: FormData) {
  const supabase = await createClient()
  
  // We get the ID from the form submission
  const id = formData.get('id') as string

  // We delete the note where the ID matches AND the user matches (RLS handles the user check automatically)
  await supabase.from('notes').delete().eq('id', id)

  revalidatePath('/')
}

export async function updateNote(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const title = formData.get('title') as string // 1. Get the new text

  // 2. Pass the object { title } to update()
  await supabase.from('notes').update({ title }).eq('id', id)

  revalidatePath('/')
}