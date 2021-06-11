import Head from "next/head";
import styles from "./Header.module.css";

type Props = {
  pageTitle: string;
  pageDescription: string;
};

export default function Header({ pageTitle, pageDescription }: Props) {
  const title = pageTitle
    ? `${pageTitle} - Zones Controller`
    : "Zones Controller";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
        />
      </Head>
      <header className={styles.header}>
        <div className={styles.content}>Zones Controller</div>
      </header>
    </>
  );
}
