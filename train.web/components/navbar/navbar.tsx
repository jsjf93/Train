import Link from "next/link";

const NavBar = () => (
  <div className="navbar-container">
    <h1>Train</h1>

    <div className="navbar-container__link-container">
      <Link href="/">
        <a className="navbar-container__link">Home</a>
      </Link>
      <Link href="/workouts">
        <a className="navbar-container__link">Workouts</a>
      </Link>
      <Link href="/exercises">
        <a className="navbar-container__link">Exercises</a>
      </Link>
    </div>
  </div>
);

export default NavBar;