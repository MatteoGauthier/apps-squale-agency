import prisma from "./prisma";
import { produce } from "immer";
import app from "next/app";
export async function getApps() {
	const apps = await prisma.app.findMany({
		include: {
			host: true,
			repository: true,
		},
	});

	const l = await Promise.all(
		apps.map(async (app) => {
			// console.log(app.id)
			return await produce(app, async (draft) => {
				const result = await fetch(`https://api.vercel.com/v8/projects/${draft.hostProjectId}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
					},
				});

				const json = await result.json();
				const vcProjectId = json.targets.production.id;
				// @ts-ignore: Unreachable code error
				draft.vcProjectId = vcProjectId;
				return draft;
			});
		})
	);

	console.log(l);

	return apps;
}
