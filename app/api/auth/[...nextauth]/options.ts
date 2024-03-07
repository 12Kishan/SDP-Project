import type { DefaultSession, DefaultUser, ISODateString, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/app/database/mongo.config";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/app/model/user";

connect()
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            isAdmin: boolean;
        } & DefaultSession['user']
    }
}

export type myUser = {
    name?: string | null;
    email?: string | null;
    isAdmin?: boolean | null;
}

export type mySession = {
    user?: myUser;
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
        async jwt({ token }){
            // console.log(`user : ${user}`)
            // const user = await User.findOne({ email: token.user?.email })
            if (token.isAdmin === undefined) {
                const tokenUser = await User.findOne({ email: token.email })
                if (tokenUser) {
                    token.isAdmin = tokenUser.isAdmin
                }
            }
            console.log(`token : `, token)
            // console.log("both :", { ...token, ...user })
            return token;
        },
        async session({ session }) {
            const user = await User.findOne({ email: session.user?.email })
            session.user.isAdmin = user.isAdmin
            session.user.id = user._id
            console.log('session : ', session)
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