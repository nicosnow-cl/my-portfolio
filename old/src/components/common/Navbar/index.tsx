export function Navbar() {
  return (
    <nav className="px-16 py-8">
      <div className="flex gap-x-16">
        <span className="font-bold">LOGO</span>

        <ul className="flex gap-x-4">
          <li>
            <a href="#">Acerca de mi</a>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
        </ul>

        <button className="ml-auto">Hola</button>
      </div>
    </nav>
  );
}
