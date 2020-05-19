import Link from "next/link";

const NavBar = () => (
  <>
    <Link href="/">
      <a className="navbar__link">Home</a>
    </Link>
    <Link href="/workouts">
      <a className="navbar__link">Workouts</a>
    </Link>
    <Link href="/exercises">
      <a className="navbar__link">Exercises</a>
    </Link>
  </>
);

export default NavBar;