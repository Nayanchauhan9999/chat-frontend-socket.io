import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <Link href={"/file-upload"}>File Upload Demo</Link>
        <br />
        <Link href={"/chats"}>All Chats</Link>
        <br />
        <Link href={"/login"}>Login</Link>
        <br />
        <Link href={"/signup"}>Sign Up</Link>
      </div>
    </main>
  );
}
