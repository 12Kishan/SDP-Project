import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/app/database/mongo.config";
import { User } from "@/app/model/user";

export const authOptions: AuthOptions = {
    pages: {
        signIn: '/login',
        // newUser: '/home'
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
            }
        })
    ]
}