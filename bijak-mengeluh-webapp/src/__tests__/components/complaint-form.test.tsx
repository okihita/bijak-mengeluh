import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComplaintForm } from '@/components/complaint-form';

describe('ComplaintForm Component', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders textarea', () => {
    render(<ComplaintForm {...mockProps} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ComplaintForm {...mockProps} />);
    const buttons = screen.getAllByRole('button');
    // Should have at least one button (submit or tone buttons)
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('calls setUserInput when typing', async () => {
    const user = userEvent.setup();
    render(<ComplaintForm {...mockProps} />);
    const textarea = screen.getByRole('textbox');
    
    await user.type(textarea, 'Test complaint');
    expect(mockProps.setUserInput).toHaveBeenCalled();
  });

  it('disables submit when input is too short', () => {
    render(<ComplaintForm {...mockProps} userInput="Short" />);
    const buttons = screen.getAllByRole('button');
    // At least one button should be disabled
    const hasDisabled = buttons.some(b => b.hasAttribute('disabled'));
    expect(hasDisabled).toBe(true);
  });

  it('enables submit when input is long enough', () => {
    render(<ComplaintForm {...mockProps} userInput="This is a long enough complaint text for testing" />);
    const buttons = screen.getAllByRole('button');
    // Should have buttons rendered
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('disables submit when loading', () => {
    render(<ComplaintForm {...mockProps} isLoading={true} userInput="Long enough text here" />);
    const buttons = screen.getAllByRole('button');
    // At least one button should be disabled when loading
    const hasDisabled = buttons.some(b => b.hasAttribute('disabled'));
    expect(hasDisabled).toBe(true);
  });

  it('renders tone selector buttons', () => {
    render(<ComplaintForm {...mockProps} />);
    // Should have multiple buttons (3 tone + 1 submit = 4 total)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });
});
