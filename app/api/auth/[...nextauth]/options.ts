import type { DefaultSession, ISODateString, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/app/database/mongo.config";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { User } from "@/app/model/user";

connect()
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            isAdmin: boolean;
        } & DefaultSession['user']
    }
}
export type myUser = {

    isAdmin: boolean;
}
export type mySession = {
    user?: typeof User;
    expires: ISODateString;
}
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        // newUser: '/home'
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log(`user : ${user}`)
            console.log(`token : ${token}`)
            console.log({ ...token, ...user })
            return { ...token, ...user };
        },
        async session({ session }) {
            const user = await User.findOne({ email: session.user?.email })
            session.user.isAdmin = user.isAdmin
            console.log(session)
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {
            try {
                console.log(profile)
                const findUser = await User.findOne({ email: user.email })
                if (findUser) {
                    return true;
                }
                await User.create({
                    name: user.name,
                    email: user.email
                })
                return true
            } catch (error) {
                console.log("error in google signin : ", error)
                return false
            }
        },
    },
    providers: [
        CredentialsProvider({
            name: "NextAuth",
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                password: {
                    label: 'password',
                    type: 'password'
                }
            },
            async authorize(credentials, req) {
                connect()
                console.log(credentials?.email)
                const user = await User.findOne({ email: credentials?.email })
                if (user) {
                    return user
                } else {
                    return null
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ]
}