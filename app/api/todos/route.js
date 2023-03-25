import { NextResponse } from 'next/server'
import { createTodo, getAllTodos } from '@/lib/mongo/todos'

export async function GET(request) {
  try {
    const { todos, error } = await getAllTodos()
    if (error) throw new Error(error)

    return NextResponse.json({ todos }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { title } = await request.json()

    const { insertedId, error } = await createTodo(title)
    if (error) throw new Error(error)

    return NextResponse.json({ insertedId }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
