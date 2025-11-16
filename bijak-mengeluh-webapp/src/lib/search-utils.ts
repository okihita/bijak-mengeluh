import { Agency } from '@/types/agency';
import { SYNONYM_MAP } from './synonyms';
import { PROBLEM_CATEGORIES } from './problem-categories';

export function searchAgencies(query: string, agencies: Agency[]): Agency[] {
  if (!query.trim()) return agencies;
  
  const queryLower = query.toLowerCase().trim();
  const mappedKeywords = SYNONYM_MAP[queryLower] || [queryLower];
  
  return agencies.filter(agency => {
    const nameMatch = agency.name.toLowerCase().includes(queryLower);
    const keywordMatch = agency.keywords?.some(k => 
      mappedKeywords.some(mk => k.toLowerCase().includes(mk))
    );
    return nameMatch || keywordMatch;
  });
}

export function getAutocomplete(query: string) {
  const queryLower = query.toLowerCase().trim();
  if (queryLower.length < 2) return [];
  
  const suggestions: Array<{ text: string; emoji: string; type: 'problem' | 'synonym' }> = [];
  
  // Check categories
  PROBLEM_CATEGORIES.forEach(cat => {
    cat.keywords.forEach(keyword => {
      if (keyword.includes(queryLower)) {
        suggestions.push({ text: keyword, emoji: cat.emoji, type: 'problem' });
      }
    });
  });
  
  // Check synonyms
  Object.entries(SYNONYM_MAP).forEach(([casual, formal]) => {
    if (casual.includes(queryLower)) {
      suggestions.push({ text: casual, emoji: '💬', type: 'synonym' });
    }
  });
  
  return suggestions.slice(0, 5);
}

export function getCategoryForQuery(query: string) {
  const queryLower = query.toLowerCase();
  return PROBLEM_CATEGORIES.find(cat => 
    cat.keywords.some(k => queryLower.includes(k))
  );
}
