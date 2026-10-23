'use client';
import { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, LogOut, User, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : { authenticated: false }))
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e8eaed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-tr from-[#1a73e8] to-[#4285f4] text-white shadow-sm font-bold text-lg">
              R
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#34a853] border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#202124] group-hover:text-[#1a73e8] transition-colors">
                Rankaro
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#5f6368]">
            <a href="/#how-it-works" className="hover:text-[#1a73e8] transition-colors">
              How It Works
            </a>
            <a href="/#features" className="hover:text-[#1a73e8] transition-colors">
              Features
            </a>
            <a href="/#ethics" className="hover:text-[#1a73e8] transition-colors flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-[#34a853]" />
              <span>Ethical Reviews</span>
            </a>
            <a href="/#faq" className="hover:text-[#1a73e8] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {loading ? (
              <div className="w-20 h-8 bg-[#f1f3f4] animate-pulse rounded-full" />
            ) : user ? (
              <div className="flex items-center space-x-3">
                <a
                  href="/dashboard"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 text-sm font-medium text-[#1a73e8] bg-[#e8f0fe] hover:bg-[#d2e3fc] rounded-full transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </a>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-2 text-[#5f6368] hover:text-[#d93025] hover:bg-[#f1f3f4] rounded-full transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[#3c4043] hover:text-[#1a73e8] hover:bg-[#f8f9fa] rounded-full transition-colors"
                >
                  Sign in
                </a>
                <a
                  href="/register"
                  className="inline-flex items-center space-x-1.5 px-5 py-2 text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-full shadow-sm hover:shadow transition-all"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5f6368] hover:text-[#202124] rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e8eaed] bg-white px-4 pt-2 pb-6 space-y-3">
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#3c4043] hover:bg-[#f8f9fa] rounded-md"
          >
            How It Works
          </a>
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#3c4043] hover:bg-[#f8f9fa] rounded-md"
          >
            Features
          </a>
          <a
            href="/#ethics"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#3c4043] hover:bg-[#f8f9fa] rounded-md"
          >
            Ethical Reviews
          </a>
          <a
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#3c4043] hover:bg-[#f8f9fa] rounded-md"
          >
            FAQ
          </a>

          <div className="pt-3 border-t border-[#f1f3f4] space-y-2">
            {user ? (
              <>
                <a
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 w-full px-4 py-2.5 text-center font-medium text-[#1a73e8] bg-[#e8f0fe] rounded-lg"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#d93025] hover:bg-[#fce8e6] rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-medium text-[#3c4043] border border-[#dadce0] rounded-lg hover:bg-[#f8f9fa]"
                >
                  Sign in
                </a>
                <a
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#1a73e8] rounded-lg shadow-sm hover:bg-[#1557b0]"
                >
                  Get Started
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
