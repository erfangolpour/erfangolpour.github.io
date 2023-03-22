function Header() {
    return (
        <header className="flex flex-row justify-between items-center py-4 px-8 bg-gray-900 text-white">
            <div className="flex flex-row items-center">
                <img src="#" className="h-8 mr-4" alt="logo" />
                <h1 className="text-xl font-semibold">My Portfolio</h1>
            </div>
            <nav>
                <ul className="flex flex-row">
                    <li className="mr-6">
                        <a href="#about">About</a>
                    </li>
                    <li className="mr-6">
                        <a href="#projects">Projects</a>
                    </li>
                    <li className="mr-6">
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;