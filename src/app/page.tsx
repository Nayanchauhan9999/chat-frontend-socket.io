import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <Link href={"/file-upload"}>File Upload Demo</Link>
        <br />
        <Link href={"/chat"}>Contact Us</Link>
      </div>
    </main>
  );
}
