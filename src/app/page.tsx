import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <Link href={"/file-upload"}>File Upload Demo</Link>
        <br />
        <Link href={"/chat"}>Contact Us</Link>
        <br />
        <Link href={"/login"}>Login</Link>
        <br />
        <Link href={"/signup"}>Sing Up</Link>
      </div>
    </main>
  );
}
