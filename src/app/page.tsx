import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav>
        <Link href="/pages/login">Login</Link>
        <br />
        <Link href="/pages/signup">Signup</Link>
      </nav>
    </main>
  );
}
