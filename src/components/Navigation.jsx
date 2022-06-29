import { Link } from "./Navigation.styled";


export default function Navigation() {
  return (
    <nav>
      <Link path="/">Home</Link>
      <Link path="/movies">Movies</Link>
    </nav>
  );
}