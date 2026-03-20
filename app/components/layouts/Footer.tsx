import Image from "next/image";
import GlassSocialIcons from "../ui/GlassSocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  };

  return (
    <footer className="relative bg-black/90 border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-4 py-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Image src="/logo-white.svg" alt="Logo" width={50} height={50} />
              <div className="text-left">
                <h2 className="text-white font-bold text-xl tracking-tight">
                  LIAM CHRISTIAN
                </h2>
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-8">
            {footerLinks.navigation.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white hover:text-green-500 transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex justify-center">
            <GlassSocialIcons />
          </div>

          <p className="text-white/60 text-sm leading-relaxed space-y-1">
            The cycle continues — if you want in on it, let's connect.
          </p>

          <div className="pt-8 border-t border-gray-700 w-full">
            <p className="text-gray-400 text-xs">
              © {currentYear} Liam Christian B. Papasin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
