import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import data from "../data"
import React from "react"
import { IoLogoGithub, IoRefresh, IoLogoVercel } from "react-icons/io5"
import bgImgSrc from "../public/bailey-zindel-II5GT90rplw-unsplash.jpg"
import { getApps } from "../lib/apps"
import { App, Prisma } from "@prisma/client"

type AppWithHostAndRepository = Prisma.AppGetPayload<{
	include: { host: true; repository: true }
}>

type Props = {
	apps: AppWithHostAndRepository[]
}

const Home: React.FC<Props> = (props) => {
	console.log(props.apps)
	return (
		<div className="">
			<Image src={bgImgSrc} alt="bg-image" layout="fill" className="z-0" />
			<div className="absolute inset-0 z-10 px-4 mx-auto max-w-screen-2xl">
				<h1 className="flex items-center mt-8 mb-5 space-x-3 text-4xl font-bold tracking-tight text-cool-gray-800">
					<span className="leading-none">apps.squale.agency</span>
					<div className="h-4 w-4 rounded-full mt-1 bg-[#0065bb]"></div>
				</h1>
				<div className="grid grid-cols-5 gap-x-2">
					{props.apps.map((app: AppWithHostAndRepository, x) => {
						return (
							<div
								className="flex flex-col overflow-hidden border rounded-lg shadow-lg bg-white/20 backdrop-blur-md backdrop-filter border-gray-200/60"
								key={x}
							>
								<div>
									<Image
										src={app.screenshot}
										layout="responsive"
										width={320}
										height={180}
										alt={`${app.name} screenshot`}
										placeholder="blur"
										blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcsXFFPQAGjAKCE2OcqgAAAABJRU5ErkJggg=="
									/>
								</div>
								<div className="px-2 py-2">
									<div className="flex items-center justify-between w-full">
										<span className="font-medium">{app.name}</span>
										<div className="bg-[#0065bb] h-3 rounded-full w-3"></div>
									</div>
									<div className="flex justify-between w-full mt-1">
										<div className="flex items-start space-x-1">
											<a
												href={`https://github.com/${app.repositorySlug}`}
												className="flex items-center self-end p-1 space-x-1 border rounded bg-blue-gray-100"
											>
												<IoLogoGithub className="w-5 h-5 text-cool-gray-900 " />
											</a>
											<a
												href={"https://vercel.com/" + app.host.projectAuthor + "/" + app.host.projectId}
												className="flex items-center self-end p-1 space-x-1 border rounded bg-blue-gray-100"
											>
												<IoLogoVercel className="w-5 h-5 text-cool-gray-900 " />
											</a>
										</div>
										<div className="flex items-center self-end p-1 space-x-1 border rounded bg-blue-gray-100">
											<span className="leading-none">Redeploy</span>
											<IoRefresh className="w-5 h-5 text-cool-gray-900" />
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Home

export const getStaticProps: GetStaticProps = async (ctx) => {
	const apps = await getApps()
	return {
		props: {
			apps: apps,
		},
	}
}
