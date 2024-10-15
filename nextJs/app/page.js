import Header from "./components/header";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      {/* Note even if the fileName start with small letter but while importing you have to use capitalLetter otherwise component just get ignored. */}
      <Header/>
      <p>🔥 Let&apos;s get started! 🔥</p>
      <Link href="/about">About us</Link>
    </main>
  );
}
