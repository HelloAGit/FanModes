import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 md:hidden">
      <div className="flex justify-between px-4 py-2">
        <Link href="/" className="flex-1 text-center">Home</Link>
        <Link href="/live" className="flex-1 text-center">Live</Link>
        <Link href="/groups" className="flex-1 text-center">Groups</Link>
        <Link href="/hilo" className="flex-1 text-center">Play</Link>
        <Link href="/profile" className="flex-1 text-center">Profile</Link>
      </div>
    </nav>
  );
}
