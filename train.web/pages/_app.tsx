import { AppProps } from 'next/app';
import '../styles/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}