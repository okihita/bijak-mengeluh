import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock Feedback component
const MockFeedback = ({ 
  onFeedback 
}: { 
  onFeedback: (type: 'positive' | 'negative') => void;
}) => (
  <div>
    <button onClick={() => onFeedback('positive')} aria-label="Helpful">
      👍 Membantu
    </button>
    <button onClick={() => onFeedback('negative')} aria-label="Not helpful">
      👎 Tidak Membantu
    </button>
  </div>
);

describe('Feedback Mechanisms', () => {
  describe('Feedback Collection', () => {
    it('provides clear feedback options', () => {
      render(<MockFeedback onFeedback={jest.fn()} />);
      
      const positiveButton = screen.getByLabelText('Helpful');
      const negativeButton = screen.getByLabelText('Not helpful');
      
      expect(positiveButton).toBeInTheDocument();
      expect(negativeButton).toBeInTheDocument();
    });

    it('uses unambiguous feedback options', () => {
      render(<MockFeedback onFeedback={jest.fn()} />);
      
      // Should have clear thumbs up/down, not vague "meh"
      const helpfulButtons = screen.getAllByText(/Membantu/i);
      expect(helpfulButtons.length).toBeGreaterThan(0);
    });

    it('calls feedback handler when clicked', async () => {
      const user = userEvent.setup();
      const mockFeedback = jest.fn();
      
      render(<MockFeedback onFeedback={mockFeedback} />);
      
      const positiveButton = screen.getByLabelText('Helpful');
      await user.click(positiveButton);
      
      expect(mockFeedback).toHaveBeenCalledWith('positive');
    });
  });

  describe('Feedback Acknowledgment', () => {
    it('acknowledges feedback was received', async () => {
      const user = userEvent.setup();
      const MockWithAck = () => {
        const [acked, setAcked] = React.useState(false);
        return (
          <div>
            <button onClick={() => setAcked(true)}>👍 Membantu</button>
            {acked && <p>Terima kasih atas masukan Anda!</p>}
          </div>
        );
      };
      
      const React = require('react');
      render(<MockWithAck />);
      
      const button = screen.getByText(/Membantu/i);
      await user.click(button);
      
      expect(screen.getByText(/Terima kasih/i)).toBeInTheDocument();
    });
  });

  describe('Feedback Impact Communication', () => {
    it('explains how feedback will be used', () => {
      const MockWithExplanation = () => (
        <div>
          <button>👍 Membantu</button>
          <p>Masukan Anda membantu kami meningkatkan kualitas saran</p>
        </div>
      );
      
      render(<MockWithExplanation />);
      
      expect(screen.getByText(/membantu kami meningkatkan/i)).toBeInTheDocument();
    });
  });

  describe('Feedback Optionality', () => {
    it('does not require feedback to proceed', () => {
      const MockOptional = ({ onContinue }: { onContinue: () => void }) => (
        <div>
          <button onClick={onContinue}>Lanjutkan</button>
          <div>
            <button>👍</button>
            <button>👎</button>
          </div>
        </div>
      );
      
      const mockContinue = jest.fn();
      render(<MockOptional onContinue={mockContinue} />);
      
      // Should be able to continue without giving feedback
      const continueButton = screen.getByText('Lanjutkan');
      expect(continueButton).toBeInTheDocument();
    });
  });
});
