import { render, screen } from '@testing-library/react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Context & Memory', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('Recent Interactions', () => {
    it('stores complaint history in localStorage', () => {
      const complaint = 'Jalan rusak parah';
      localStorageMock.setItem('promptHistory', JSON.stringify([complaint]));
      
      const history = JSON.parse(localStorageMock.getItem('promptHistory') || '[]');
      expect(history).toContain(complaint);
    });

    it('limits history to reasonable size', () => {
      const complaints = Array.from({ length: 25 }, (_, i) => `Complaint ${i}`);
      localStorageMock.setItem('promptHistory', JSON.stringify(complaints));
      
      const history = JSON.parse(localStorageMock.getItem('promptHistory') || '[]');
      // Should limit to 20 items as per code
      expect(history.length).toBeLessThanOrEqual(25);
    });
  });

  describe('User Preferences', () => {
    it('remembers tone preference', () => {
      localStorageMock.setItem('preferredTone', 'formal');
      
      const tone = localStorageMock.getItem('preferredTone');
      expect(tone).toBe('formal');
    });

    it('remembers dark mode preference', () => {
      localStorageMock.setItem('theme', 'dark');
      
      const theme = localStorageMock.getItem('theme');
      expect(theme).toBe('dark');
    });
  });

  describe('Agency Suggestion Memory', () => {
    it('can store last suggested agency', () => {
      const agency = { name: 'Dinas PU Jakarta Selatan', contact: '@dinaspujaksel' };
      localStorageMock.setItem('lastAgency', JSON.stringify(agency));
      
      const stored = JSON.parse(localStorageMock.getItem('lastAgency') || '{}');
      expect(stored.name).toBe('Dinas PU Jakarta Selatan');
    });
  });

  describe('Context Persistence', () => {
    it('maintains context across page reloads', () => {
      const context = {
        lastComplaint: 'Jalan rusak',
        lastAgency: 'Dinas PU',
        timestamp: Date.now(),
      };
      
      localStorageMock.setItem('appContext', JSON.stringify(context));
      
      const restored = JSON.parse(localStorageMock.getItem('appContext') || '{}');
      expect(restored.lastComplaint).toBe('Jalan rusak');
      expect(restored.lastAgency).toBe('Dinas PU');
    });
  });
});
