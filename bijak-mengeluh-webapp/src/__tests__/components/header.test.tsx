import { render, screen } from '@testing-library/react';
import { Header } from '@/components/header';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header Component', () => {
  it('renders header element', () => {
    render(<Header />);
    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('renders logo link', () => {
    render(<Header />);
    const logo = screen.getByText('Bijak Mengeluh');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders navigation links', () => {
    render(<Header />);
    const homeLink = screen.getByText('Buat Keluhan');
    const historyLink = screen.getByText('Riwayat');
    
    expect(homeLink).toBeInTheDocument();
    expect(historyLink).toBeInTheDocument();
  });

  it('home link points to correct path', () => {
    render(<Header />);
    const homeLink = screen.getByText('Buat Keluhan').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('history link points to correct path', () => {
    render(<Header />);
    const historyLink = screen.getByText('Riwayat').closest('a');
    expect(historyLink).toHaveAttribute('href', '/history');
  });

  it('has responsive classes (hidden on mobile, visible on desktop)', () => {
    render(<Header />);
    const header = document.querySelector('header');
    expect(header?.className).toContain('hidden');
    expect(header?.className).toContain('sm:block');
  });

  it('has sticky positioning', () => {
    render(<Header />);
    const header = document.querySelector('header');
    expect(header?.className).toContain('sticky');
  });
});
