import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GeneratedComplaint } from '@/components/generated-complaint';

// Mock hooks
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

describe('GeneratedComplaint Component', () => {
  const mockProps = {
    generatedText: '',
    isLoading: false,
    originalText: 'Original complaint',
    ministry: 'Test Ministry',
  };

  it('shows skeleton when loading', () => {
    render(<GeneratedComplaint {...mockProps} isLoading={true} />);
    // Skeleton should be visible
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('shows generated text when not loading', () => {
    render(<GeneratedComplaint {...mockProps} generatedText="Generated complaint text" />);
    expect(screen.getByText('Generated complaint text')).toBeInTheDocument();
  });

  it('shows success message when text is generated', () => {
    render(<GeneratedComplaint {...mockProps} generatedText="Test text" />);
    expect(screen.getByText(/Sudah Jadi/i)).toBeInTheDocument();
  });

  it('renders copy button when text is generated', () => {
    render(<GeneratedComplaint {...mockProps} generatedText="Test text" />);
    const copyButtons = screen.getAllByText(/Salin/i);
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  it('renders share buttons when text is generated', () => {
    render(<GeneratedComplaint {...mockProps} generatedText="Test text" />);
    expect(screen.getByText(/Bagikan/i)).toBeInTheDocument();
    expect(screen.getByText(/Instagram/i)).toBeInTheDocument();
  });

  it('renders comparison button when text is generated', () => {
    render(<GeneratedComplaint {...mockProps} generatedText="Test text" />);
    expect(screen.getByText(/Bandingkan/i)).toBeInTheDocument();
  });

  it('shows comparison view when button clicked', async () => {
    const user = userEvent.setup();
    render(<GeneratedComplaint {...mockProps} generatedText="Generated text" originalText="Original text" />);
    
    const compareButton = screen.getByText(/Bandingkan/i);
    await user.click(compareButton);
    
    // Should show both original and generated
    expect(screen.getByText('Original text')).toBeInTheDocument();
    expect(screen.getByText('Generated text')).toBeInTheDocument();
  });

  it('does not show buttons when loading', () => {
    render(<GeneratedComplaint {...mockProps} isLoading={true} />);
    // Check for button element specifically, not text that might appear in description
    const buttons = screen.queryAllByRole('button');
    const copyButton = buttons.find(b => b.textContent?.includes('📋'));
    expect(copyButton).toBeUndefined();
  });

  it('does not show action buttons when no text generated', () => {
    render(<GeneratedComplaint {...mockProps} />);
    // Check for button element specifically
    const buttons = screen.queryAllByRole('button');
    const copyButton = buttons.find(b => b.textContent?.includes('📋'));
    expect(copyButton).toBeUndefined();
  });
});
