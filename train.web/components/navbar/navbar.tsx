import Link from "next/link";

const NavBar = () => (
  <>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/workouts">
      <a>Workouts</a>
    </Link>
    <Link href="/exercises">
      <a>Exercises</a>
    </Link>
  </>
);

export default NavBar;