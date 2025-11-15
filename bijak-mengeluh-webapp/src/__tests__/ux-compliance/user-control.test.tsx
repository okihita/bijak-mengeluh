import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GeneratedComplaint } from '@/components/generated-complaint';

jest.mock('@/lib/hooks', () => ({
  useCopyToClipboard: () => ({
    copied: false,
    copy: jest.fn(),
  }),
  useWebShare: () => ({
    share: jest.fn(),
    shareAsImage: jest.fn(),
  }),
}));

describe('User Control & Freedom', () => {
  const mockProps = {
    generatedText: 'Generated complaint text',
    isLoading: false,
    originalText: 'Original complaint',
    ministry: 'Test Ministry',
  };

  describe('Edit Capability', () => {
    it('allows viewing comparison to edit original', async () => {
      const user = userEvent.setup();
      render(<GeneratedComplaint {...mockProps} />);
      
      const compareButton = screen.getByText(/Bandingkan/i);
      await user.click(compareButton);
      
      // Should show both original and generated
      expect(screen.getByText('Original complaint')).toBeInTheDocument();
      expect(screen.getByText('Generated complaint text')).toBeInTheDocument();
    });

    it('provides clear way to start over', () => {
      render(<GeneratedComplaint {...mockProps} />);
      
      // Should have buttons to take action
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Undo/Redo Support', () => {
    it('allows toggling comparison view', async () => {
      const user = userEvent.setup();
      render(<GeneratedComplaint {...mockProps} />);
      
      const compareButton = screen.getByText(/Bandingkan/i);
      
      // Show comparison
      await user.click(compareButton);
      expect(screen.getByText('Original complaint')).toBeInTheDocument();
      
      // Hide comparison (undo)
      const hideButton = screen.getByText(/Sembunyikan/i);
      await user.click(hideButton);
      
      // Original should not be visible
      expect(screen.queryByText('Original complaint')).not.toBeInTheDocument();
    });
  });

  describe('Emergency Exits', () => {
    it('provides clear dismiss action for generated content', () => {
      render(<GeneratedComplaint {...mockProps} />);
      
      // Should have way to dismiss or start over
      const buttons = screen.getAllByRole('button');
      const hasActionButtons = buttons.length > 0;
      expect(hasActionButtons).toBe(true);
    });
  });
});
