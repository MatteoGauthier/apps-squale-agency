import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import data from "../data";
import React from "react";
import { IoLogoGithub, IoRefresh, IoLogoVercel } from "react-icons/io5";
import bgImgSrc from "../public/bailey-zindel-II5GT90rplw-unsplash.jpg";
interface SSGProps {
	title: string;
	apps: {
		name: string;
		domain: string;
		description: string;
		productionUrl: string;
		deployHook: string;
		screenshot: string;
		host: {
			name: string;
			projectId: string;
			user: string;
			id?: string;
		};
		git: { url: string; branches: string[] };
	}[];
}

const Home = ({ data: { apps } }: { data: SSGProps }) => {
	return (
		<div className="">
			<Image src={bgImgSrc} alt="bg-image" layout="fill"  className="z-0" />
			<div className="max-w-screen-2xl mx-auto px-4 absolute inset-0 z-10">
				<h1 className="text-4xl flex items-center space-x-3 font-bold text-cool-gray-800 tracking-tight mt-8 mb-5">
					<span className="leading-none">apps.squale.agency</span>
					<div className="h-4 w-4 rounded-full mt-1 bg-[#0065bb]"></div>
				</h1>
				<div className="grid grid-cols-5 gap-x-2">
					{[...apps, ...apps].map((app, x) => {
						return (
							<div
								className="flex flex-col shadow-lg border bg-white/20 backdrop-blur-md backdrop-filter border-gray-200/60 rounded-lg overflow-hidden"
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
									<div className="flex justify-between w-full items-center">
										<span className="font-medium">{app.name}</span>
										<div className="bg-[#0065bb] h-3 rounded-full w-3"></div>
									</div>
									<div className="flex w-full justify-between mt-1">
										<div className="flex items-start space-x-1">
											<a
												href={app.git.url}
												className="p-1 self-end flex items-center bg-blue-gray-100 space-x-1 rounded border"
											>
												<IoLogoGithub className="h-5 w-5 text-cool-gray-900 " />
											</a>
											<a
												href={"https://vercel.com/" + app.host.user + "/" + app.host.projectId}
												className="p-1 self-end flex items-center bg-blue-gray-100 space-x-1 rounded border"
											>
												<IoLogoVercel className="h-5 w-5 text-cool-gray-900 " />
											</a>
										</div>
										<div className="p-1 self-end flex items-center bg-blue-gray-100 space-x-1 rounded border">
											<span className="leading-none">Redeploy</span>
											<IoRefresh className="h-5 w-5 text-cool-gray-900" />
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
	return {
		props: {
			data: data,
		},
	};
};
