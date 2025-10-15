// pages/_app.js
import '../styles/globals.css'; // your global CSS
import { Analytics } from "@vercel/analytics/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
