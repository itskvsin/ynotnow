export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm">© 2025 Ynotnow. All Rights Reserved.</p>
        </div>

        <nav
          className="flex flex-row sm:flex-row items-center gap-10 sm:gap-10"
          aria-label="Footer navigation"
        >
          <a
            href="#"
            className="text-sm hover:underline"
          >
            Terms &amp; Conditions
          </a>

          <a
            href="#"
            className="text-sm hover:underline"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="text-sm hover:underline"
          >
            Return Policy
          </a>
        </nav>
      </div>
    </footer>
  )
}
