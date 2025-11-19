import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcrypt'
import prisma from "@/db/db"
import NextAuth from "next-auth"



export const authOptions = {
  providers: [

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id.toString(),
          email: user.email,
        }
      },
      
    }),
  ],
  
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
  callbacks:{
        session: async ({session, user})=> {
          
          // {
          //   user: { name: undefined, email: 'test2@gmail.com', image: undefined },
          //    expires: '2024-11-25T19:32:00.739Z'
          // }
          return session
        },
        // jwt: async({token, user}:{
        //   token: { name: string, email: string, image: string, id: string, iat: number, exp: number },
        //   user: {name: string, email: string, image: string, id: string}
        // }) =>{
        //   if (user) {
        //     token.id = user.id;
        //   }
        //   return token
        // },

      },
  
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
