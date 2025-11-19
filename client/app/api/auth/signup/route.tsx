import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)
 
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    })

    return NextResponse.json({ message: 'User created successfully', user: { id: user.id, email: user.email } }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ message: 'An error occurred during signup' }, { status: 500 })
  }
}
