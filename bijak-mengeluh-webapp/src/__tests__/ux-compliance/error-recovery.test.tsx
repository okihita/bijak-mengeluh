import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorMessage } from '@/components/error-message';

describe('Error Recovery', () => {
  describe('Error Message Quality', () => {
    it('shows plain language error messages', () => {
      render(<ErrorMessage error="Terjadi kesalahan jaringan" onRetry={jest.fn()} />);
      
      // Should show Indonesian error message
      const errorText = screen.getByText(/Terjadi kesalahan/i);
      expect(errorText).toBeInTheDocument();
    });

    it('provides constructive solution', () => {
      render(<ErrorMessage error="Koneksi terputus" onRetry={jest.fn()} />);
      
      // Should suggest action with retry button
      const retryButton = screen.getByRole('button');
      expect(retryButton).toBeInTheDocument();
      expect(retryButton.textContent).toContain('Coba');
    });

    it('uses Indonesian language for errors', () => {
      render(<ErrorMessage error="Server sibuk" onRetry={jest.fn()} />);
      
      // Check for Indonesian text
      const text = document.body.textContent || '';
      expect(text).toContain('Waduh');
      expect(text).toContain('Coba Lagi');
    });
  });

  describe('Retry Functionality', () => {
    it('provides retry button', () => {
      render(<ErrorMessage error="Test error" onRetry={jest.fn()} />);
      
      const retryButton = screen.getByRole('button');
      expect(retryButton).toBeInTheDocument();
    });

    it('calls retry handler when clicked', async () => {
      const user = userEvent.setup();
      const mockRetry = jest.fn();
      
      render(<ErrorMessage error="Test error" onRetry={mockRetry} />);
      
      const retryButton = screen.getByRole('button');
      await user.click(retryButton);
      
      expect(mockRetry).toHaveBeenCalled();
    });
  });

  describe('Error State Recovery', () => {
    it('clears error state when error is null', () => {
      const { rerender } = render(<ErrorMessage error="Test error" onRetry={jest.fn()} />);
      
      // Error should be visible
      expect(screen.getByText(/Test error/i)).toBeInTheDocument();
      
      // After clearing error
      rerender(<ErrorMessage error={null} onRetry={jest.fn()} />);
      expect(screen.queryByText(/Test error/i)).not.toBeInTheDocument();
    });
  });
});
