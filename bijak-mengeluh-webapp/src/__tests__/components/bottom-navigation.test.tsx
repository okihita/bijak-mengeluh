import { render, screen } from '@testing-library/react';
import { BottomNavigation } from '@/components/bottom-navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('BottomNavigation Component', () => {
  it('renders navigation container', () => {
    render(<BottomNavigation />);
    const nav = document.querySelector('.fixed.bottom-0');
    expect(nav).toBeInTheDocument();
  });

  it('renders home link', () => {
    render(<BottomNavigation />);
    const homeLink = screen.getByText('Complaint');
    expect(homeLink).toBeInTheDocument();
  });

  it('renders history link', () => {
    render(<BottomNavigation />);
    const historyLink = screen.getByText('History');
    expect(historyLink).toBeInTheDocument();
  });

  it('home link points to correct path', () => {
    render(<BottomNavigation />);
    const homeLink = screen.getByText('Complaint').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('history link points to correct path', () => {
    render(<BottomNavigation />);
    const historyLink = screen.getByText('History').closest('a');
    expect(historyLink).toHaveAttribute('href', '/history');
  });

  it('is hidden on desktop (sm:hidden)', () => {
    render(<BottomNavigation />);
    const nav = document.querySelector('.fixed.bottom-0');
    expect(nav?.className).toContain('sm:hidden');
  });

  it('has proper z-index for overlay', () => {
    render(<BottomNavigation />);
    const nav = document.querySelector('.fixed.bottom-0');
    expect(nav?.className).toContain('z-50');
  });
});
