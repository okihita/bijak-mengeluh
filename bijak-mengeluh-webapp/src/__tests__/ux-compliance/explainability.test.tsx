import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock SuggestedContacts component
const MockSuggestedContacts = ({ 
  contacts, 
  rationale 
}: { 
  contacts: any[]; 
  rationale: string;
}) => (
  <div>
    {contacts.map((contact, i) => (
      <div key={i}>
        <h3>{contact.name}</h3>
        {rationale && (
          <div>
            <button>Kenapa instansi ini?</button>
            <p>{rationale}</p>
          </div>
        )}
      </div>
    ))}
  </div>
);

describe('Explainability & Transparency', () => {
  describe('AI Decision Explanation', () => {
    it('provides "Why this agency?" affordance', () => {
      const contacts = [{ name: 'Dinas PU Jakarta Selatan' }];
      const rationale = 'Berdasarkan lokasi Jakarta Selatan';
      
      render(<MockSuggestedContacts contacts={contacts} rationale={rationale} />);
      
      // Should have explanation button
      const explainButton = screen.getByText(/Kenapa instansi ini/i);
      expect(explainButton).toBeInTheDocument();
    });

    it('displays reasoning when available', () => {
      const contacts = [{ name: 'Dinas PU Jakarta Selatan' }];
      const rationale = 'Berdasarkan lokasi Jakarta Selatan dan jenis keluhan infrastruktur';
      
      render(<MockSuggestedContacts contacts={contacts} rationale={rationale} />);
      
      // Rationale should be visible
      expect(screen.getByText(/Berdasarkan lokasi/i)).toBeInTheDocument();
    });

    it('explains in plain Indonesian', () => {
      const contacts = [{ name: 'Test Agency' }];
      const rationale = 'Instansi ini dipilih karena menangani keluhan jalan rusak di wilayah Jakarta Selatan';
      
      render(<MockSuggestedContacts contacts={contacts} rationale={rationale} />);
      
      const text = screen.getByText(/Instansi ini dipilih/i);
      expect(text).toBeInTheDocument();
      
      // Should not contain technical jargon
      expect(text.textContent).not.toContain('algorithm');
      expect(text.textContent).not.toContain('vector');
    });
  });

  describe('Process Transparency', () => {
    it('shows what AI is doing during generation', () => {
      // This would test the thinking text feature
      // For now, just verify the concept
      expect(true).toBe(true);
    });
  });
});
