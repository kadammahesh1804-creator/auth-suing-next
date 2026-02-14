import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col gap-4 p-4 border rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Welcome</h1>
        
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required className="border p-2 rounded" />
        
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required className="border p-2 rounded" />
        
        <div className="flex gap-2">
          {/* formAction allows two buttons to do different things in one form */}
          <button formAction={login} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Log in
          </button>
          <button formAction={signup} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}