import { Provider } from "next-auth/client"
import { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import { Toaster } from "react-hot-toast"
import "tippy.js/dist/tippy.css" // optional
import "tippy.js/themes/light.css" // optional

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider session={pageProps.session}>
			<Toaster
				toastOptions={{
					position: "bottom-right",
				}}
			/>
			<Component {...pageProps} />
		</Provider>
	)
}

export default App
