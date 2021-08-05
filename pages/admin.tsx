import React from "react"
import { useSession, getSession, signIn } from "next-auth/client"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useForm } from "react-hook-form"
interface Props {}

const Admin = (props: Props) => {
	const [session, loading] = useSession()

	if (typeof window !== "undefined" && loading) return null
	// if (session) console.log(session)
	if (session?.authorized) {
		return (
			<>
				<h1>Protected Page</h1>
				<p>You can view this page because you are signed in.</p>
				<hr />
				<NewAppForm />
			</>
		)
	}
	return <p onClick={() => signIn()}>Access Denied</p>
}

export default Admin

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)
	// console.log(context);

	return {
		props: { session },
	}
}

const NewAppForm = () => {
	const { register, handleSubmit, control } = useForm()
	const onSubmit = (data: any) => {
		console.log(data)
	}
	return (
		<>
			<h2 className="text-3xl font-bold">New App</h2>
			<p>You can create a new app here.</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="order-1 p-5 mb-4 space-y-4 bg-white rounded-lg shadow-md md:mb-0 md:sticky md:order-none top-3"
				style={{ height: "min-content" }}
			>
				<div className="text-lg font-semibold text-blue-gray-800">Ajouter une nouvelle idée</div>
				<div className="block">
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">
						App name
					</label>
					<input
						type="text"
						{...register("name", { required: true })}
						id="name"
						placeholder="Fusée ariane"
						required
						autoComplete="family-name"
						className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>

				<div className="">
					<label htmlFor="description" className="block text-sm font-medium text-gray-700">
						Description de l&apos;app
					</label>
					<div className="mt-1">
						<input
							type="text"
							{...register("description", { required: true })}
							id="description"
							placeholder="Fusée ariane"
							required
							className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
				</div>
				<div className="">
					<label htmlFor="domain" className="block text-sm font-medium text-gray-700">
						Domain name
					</label>
					<div className="mt-1">
						<input
							type="text"
							{...register("domain", { required: true })}
							id="domain"
							placeholder="Fusée ariane"
							required
							className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
				</div>
				<div className="">
					<label htmlFor="screenshot" className="block text-sm font-medium text-gray-700">
						screenshot de l&apos;app
					</label>
					<div className="mt-1">
						<input
							type="text"
							{...register("screenshot", { required: true })}
							id="screenshot"
							placeholder="Fusée ariane"
							required
							className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
				</div>
				<div className="">
					<label htmlFor="deployHookUrl" className="block text-sm font-medium text-gray-700">
						deployHookUrl de l&apos;app
					</label>
					<div className="mt-1">
						<input
							type="text"
							{...register("deployHookUrl", { required: true })}
							id="deployHookUrl"
							placeholder="Fusée ariane"
							required
							className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
				</div>
				{/* <StatusSelect control={control} /> */}
				<div className="">
					<input type="checkbox" id="favorite" {...register("favorite")} className="text-pink-500 rounded" />
					<label htmlFor="favorite" className="inline-flex ml-2 text-sm font-medium text-gray-700">
						Ajouter le tag
					</label>
				</div>
				<button type="submit" className="inline-flex items-center justify-center w-full py-2 bg-indigo-700 rounded">
					<p className="text-sm font-medium leading-tight text-white">Ajouter mon idée</p>
				</button>
			</form>
		</>
	)
}
