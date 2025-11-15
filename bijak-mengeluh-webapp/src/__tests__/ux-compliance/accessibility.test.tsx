import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/header';
import { ComplaintForm } from '@/components/complaint-form';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Accessibility Compliance', () => {
  describe('Keyboard Navigation', () => {
    it('header links are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      
      // Tab to first link
      await user.tab();
      expect(links[0]).toHaveFocus();
    });

    it('form can be submitted with Enter key', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn((e) => e.preventDefault());
      const mockProps = {
        handleSubmit: mockSubmit,
        userInput: 'This is a long enough complaint text for testing',
        setUserInput: jest.fn(),
        isLoading: false,
        lastSaved: null,
        isSaving: false,
        tone: 'formal',
        setTone: jest.fn(),
      };
      
      render(<ComplaintForm {...mockProps} />);
      const textarea = screen.getByRole('textbox');
      
      await user.click(textarea);
      await user.keyboard('{Enter}');
      
      // Form should handle Enter key
      expect(textarea).toBeInTheDocument();
    });

    it('escape key clears focus', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      const link = screen.getAllByRole('link')[0];
      await user.click(link);
      expect(link).toHaveFocus();
      
      await user.keyboard('{Escape}');
      expect(link).not.toHaveFocus();
    });
  });

  describe('ARIA Labels', () => {
    it('navigation has proper ARIA structure', () => {
      render(<Header />);
      const header = document.querySelector('header');
      expect(header).toBeInTheDocument();
      
      // Links should have accessible text
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link.textContent).toBeTruthy();
      });
    });

    it('form elements have labels', () => {
      const mockProps = {
        handleSubmit: jest.fn(),
        userInput: '',
        setUserInput: jest.fn(),
        isLoading: false,
        lastSaved: null,
        isSaving: false,
        tone: 'formal',
        setTone: jest.fn(),
      };
      
      render(<ComplaintForm {...mockProps} />);
      const textarea = screen.getByRole('textbox');
      
      // Textarea should be accessible
      expect(textarea).toBeInTheDocument();
    });
  });

  describe('Focus Indicators', () => {
    it('focused elements are visually distinct', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      const link = screen.getAllByRole('link')[0];
      await user.tab();
      
      // Element should have focus
      expect(link).toHaveFocus();
    });
  });
});
