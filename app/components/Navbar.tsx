export default function Navbar() {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-8 px-20 py-3 rounded-full
                  bg-white/5 backdrop-blur-md border border-white/20">
                <a href="#" className="text-white font-medium hover:text-gray-300">Home</a>
                <a href="#" className="text-white font-medium hover:text-gray-300">About</a>
                <a href="#" className="text-white font-medium hover:text-gray-300">Projects</a>
                <a href="#" className="text-white font-medium hover:text-gray-300">Contact</a>
            </div>
        </nav>

    );
}