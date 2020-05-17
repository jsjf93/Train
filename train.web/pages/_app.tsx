import { AppProps } from 'next/app';
import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}