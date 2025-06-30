// pages/_app.tsx
import '../globals.css'; // ou le nom de votre fichier css principal
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;