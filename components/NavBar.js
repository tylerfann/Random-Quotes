import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="p-2 bg-white flex flex-row justify-end">
      <Link href="/">
        <a className="m-2">Home</a>
      </Link>
      <Link href="/favorites">
        <a className="m-2">Favorites</a>
      </Link>
    </nav>
  );
};

export default NavBar;
