import { Provider } from "next-auth/client"
import { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import toast, { Toaster } from "react-hot-toast"

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <Provider session={pageProps.session}>
        <Component {...pageProps} />
        <Toaster />
    </Provider>
  )
}

export default App