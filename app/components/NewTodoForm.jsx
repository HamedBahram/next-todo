'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

const NewTodoForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  const handleSubmit = async e => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title')

    if (!title) return

    setIsFetching(true)

    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/todos`, {
      method: 'POST',
      body: JSON.stringify({ title })
    })

    form.reset()
    setIsFetching(false)
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='font-medium mb-2'>Create a New Todo</h2>
      <input
        type='text'
        name='title'
        className='border border-emerald-400 px-2 py-0.5 rounded'
      />
      <button
        type='submit'
        disabled={isMutating}
        className='ml-2 text-sm px-2 py-1 border border-emerald-400 rounded bg-emerald-400 text-white disabled:bg-opacity-50'
      >
        Add Todo
      </button>
    </form>
  )
}

export default NewTodoForm
