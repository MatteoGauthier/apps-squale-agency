import prisma from "./prisma"
import { produce } from "immer"
import app from "next/app"
export async function getApps() {
	const apps = await prisma.app.findMany({
		include: {
			host: true,
			repository: true,
		},
	})

	// apps.map(async (app) => {
	//   const {
	//     targets: {
	//       production: { id: vcProjectId },
	//     },
	//   } = await (
	//     await fetch(`https://api.vercel.com/v8/projects/${app.hostProjectId}`, {
	//       headers: {
	//         "Content-Type": "application/json",
	//         Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
	//       },
	//     })
	//   ).json()

	//   console.log({ ...app, vcProjectId })
	//   // return

	// })

	const l = await Promise.all(
		apps.map(async (app) => {
			// console.log(app.id)
			return produce(app, async (draft) => {
				const {
					targets: {
						production: { id: vcProjectId },
					},
				} = await (
					await fetch(`https://api.vercel.com/v8/projects/${draft.hostProjectId}`, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
						},
					})
				).json()
        // @ts-ignore: Unreachable code error
        draft.vcProjectId = vcProjectId
        return draft
			})
			// const contents = await fs.readFile(file, 'utf8')
			// console.log(contents)
		})
	)

	// const result = await produce(apps, async (draft) => {})
	// for await (const iterator of apps) {
	// }

	// 	draft.map(async (app) => {
	// 		const {
	// 			targets: {
	// 				production: { id: vcProjectId },
	// 			},
	// 		} = await (
	// 			await fetch(`https://api.vercel.com/v8/projects/${app.hostProjectId}`, {
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
	// 				},
	// 			})
	// 		).json()

	// 		// @ts-ignore: Unreachable code error
	// 		app.vcProjectId = vcProjectId

	// 		return { app }
	// 		// console.log(vcProjectId)
	// 	})
	// })

	console.log(l)

	return apps
}
