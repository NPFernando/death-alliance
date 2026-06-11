export type PageKey = 'home' | 'submit' | 'archive' | 'manifest' | 'architecture' | 'about' | 'rules' | 'health';

export type NavItem = {
  key: PageKey;
  label: string;
  marker: string;
};

export type DraftCase = {
  anonymousName: string;
  hiddenKey: string;
  contentMode: string;
  title: string;
  category: string;
  description: string;
  consent: boolean;
};

export type CaseReport = {
  id: string;
  title: string;
  villain: string;
  category: string;
  status: string;
  summary: string;
  votes: { up: number; down: number };
  comments: number;
  evidence: string[];
  threadSummary: string;
  commentsList: {
    id: string;
    anonymousName: string;
    type: string;
    body: string;
    votes: { up: number; down: number };
  }[];
};
