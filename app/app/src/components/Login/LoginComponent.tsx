import { useSession, signIn, signOut } from "next-auth/react"
import { Main } from "../Main/view/main"

export default function Login() {
  const { data: session } = useSession()
  if (session) {
    return (
        <main className='w-screen bg-white' >
          <Main/>
        </main>
    )
  }
  return (
    <div className="flex justify-center h-screen">
      <button className="w-2/3 h-10 bg-orange-300 mt-20 border border-gray-200 text-black" onClick={() => signIn()}>Sign In</button> 
    </div>
  )
}