import { NextApiHandler } from "next"
import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import Adapters from "next-auth/adapters"
import prisma from "../../../lib/prisma"

const whitelist = ["matteo.gauthier@gmail.com"]

export default NextAuth({
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			scope: "read:user",
		}),
	],
	callbacks: {
		// async redirect(url, baseUrl) {
		// 	return baseUrl
		// },
		async signIn(user, account, profile) {
			console.log(user)
			const isAuthorized = whitelist.find((u) => u === profile?.name)

			if (isAuthorized) {
				return true
			} else {
				return false
			}
		},
		async session(session, token) {
			if (!session.user || !session.user.email) return session
			const email: string = session?.user?.email?.toLowerCase()

			if (whitelist.includes(email)) {
				session.authorized = true
				return session
			} else {
				session.authorized = false
				return session
			}
		},
	},

	// adapter: Adapters.Prisma.Adapter({ prisma }),
	secret: process.env.SECRET,
	session: {
		maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60,
	},
})
