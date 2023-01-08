import { useState } from 'react'

export default function Home() {
  const [username, setUsername] = useState<string>('')

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='flex flex-col items-center gap-3'>
        <h1 className='text-2xl font-bold'>Rules Excel</h1>

        <p>Veuillez entrer un pseudo d&apos;un utilisateur Rules.</p>

        <input
          type='text'
          placeholder='Pseudo'
          value={username}
          onChange={(ev) => setUsername(ev.target.value.toLowerCase())}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              checkUser(username)
            }
          }}
          className='bg-inherit border border-zinc-200 rounded-md px-2 py-1 w-full outline-none focus:outline-violet-700'
        />

        <button
          onClick={() => checkUser(username)}
          className='bg-violet-700 text-zinc-200 rounded-md px-2 py-1 w-1/2 outline-none focus:outline-violet-700'
        >
          Chercher
        </button>
      </div>
    </div>
  )
}

async function checkUser(username: string) {
  const result = await fetch(`/api/check-user/${username}`)

  if (result.ok) {
    window.location.href = `/user/${username}`
  } else {
    alert('Utilisateur introuvable.')
  }
}
