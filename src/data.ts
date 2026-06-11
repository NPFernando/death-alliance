import { BadgeCheck, ShieldAlert, Vote } from 'lucide-react';
import { caseCategories, contentModes } from './safety';
import type { CaseReport, DraftCase, NavItem } from './types';

export const navItems: NavItem[] = [
  { key: 'home', label: 'Home', marker: '>_' },
  { key: 'submit', label: 'Submit clue', marker: '/' },
  { key: 'archive', label: 'Archive', marker: '/' },
  { key: 'manifest', label: 'Manifest', marker: '/' },
  { key: 'architecture', label: 'Architecture', marker: '/' },
  { key: 'about', label: 'About', marker: '/' },
  { key: 'rules', label: 'Rules', marker: '/' },
  { key: 'health', label: 'Status', marker: '/' },
];

export const initialDraft: DraftCase = {
  anonymousName: '',
  hiddenKey: '',
  contentMode: contentModes[0],
  title: '',
  category: caseCategories[3],
  description: '',
  consent: false,
};

export const recentCases = [
  { id: 'DA-000184', title: 'The Stolen Engine', status: 'Strongly Supported', updated: 'v1 · 120/14' },
  { id: 'DA-000212', title: 'The Silent Laboratory', status: 'Counter-Evidence Added', updated: 'v2 · 77/39' },
  { id: 'DA-000301', title: 'Archive of the Broken Oath', status: 'Needs More Evidence', updated: 'v1 · 31/28' },
  { id: 'DA-000447', title: 'The Redacted Blueprint', status: 'Disputed', updated: 'v3 · 54/51' },
];

export const exampleReports: CaseReport[] = [
  {
    id: 'DA-DRACULA-001',
    title: 'The Crimson Castle Ledger',
    villain: 'Count Dracula-inspired antagonist',
    category: 'Abuse of Authority',
    status: 'Heavily Disputed',
    summary: 'A fictional village archive claims a nocturnal noble used fear, forged medical notes, and sealed castle records to control witnesses.',
    votes: { up: 248, down: 91 },
    comments: 37,
    evidence: ['Cleaned castle map', 'Witness-lore timeline', 'Counter-evidence diary note'],
    threadSummary: 'Thread status: Heavily Disputed. Community members are comparing cleaned lore artifacts, disputed witness timelines, and counter-evidence notes.',
    commentsList: [
      { id: 'greycrow', anonymousName: 'GreyCrow', type: 'supporting_evidence', body: 'Adds fictional timeline context supporting the castle ledger story arc.', votes: { up: 18, down: 2 } },
      { id: 'silentbell', anonymousName: 'SilentBell', type: 'challenge', body: 'Questions whether the sealed ledger evidence is strong enough for archive credibility.', votes: { up: 11, down: 1 } },
    ],
  },
  {
    id: 'DA-MORIARTY-014',
    title: 'The Clockwork Patent Theft',
    villain: 'Professor Moriarty-inspired strategist',
    category: 'Invention Theft',
    status: 'Strongly Supported',
    summary: 'A fictional inventor report alleges a criminal mastermind redirected a public-good engine patent through shell academies.',
    votes: { up: 412, down: 38 },
    comments: 64,
    evidence: ['Signed blueprint hash', 'Cleaned lab notebook', 'Archive manifest link'],
    threadSummary: 'Thread status: Strongly Supported. The demo thread connects signed blueprint hashes, cleaned lab notes, and archive-manifest references.',
    commentsList: [
      { id: 'archiveowl', anonymousName: 'ArchiveOwl', type: 'supporting_evidence', body: 'Maps the fictional patent transfer to a signed blueprint hash.', votes: { up: 26, down: 3 } },
      { id: 'blueember', anonymousName: 'BlueEmber', type: 'lore_context', body: 'Adds worldbuilding context for the academy shell organizations.', votes: { up: 17, down: 2 } },
    ],
  },
  {
    id: 'DA-HOOK-022',
    title: 'The Stolen Star Compass',
    villain: 'Captain Hook-inspired pirate lord',
    category: 'Technology Theft',
    status: 'Counter-Evidence Added',
    summary: 'A fictional maritime case where rival crews debate whether a navigation device was stolen, inherited, or planted as bait.',
    votes: { up: 173, down: 84 },
    comments: 29,
    evidence: ['Cleaned port manifest', 'Dispute comment thread', 'Replica compass photos'],
    threadSummary: 'Thread status: Counter-Evidence Added. The demo thread compares cleaned port records, replica photos, and rival crew comments.',
    commentsList: [
      { id: 'northstar', anonymousName: 'NorthStar', type: 'counter_evidence', body: 'Adds fictional counter-evidence that the compass transfer was inherited.', votes: { up: 14, down: 4 } },
      { id: 'redwake', anonymousName: 'RedWake', type: 'duplicate_warning', body: 'Flags a possible duplicate with an older sea-route archive case.', votes: { up: 9, down: 2 } },
    ],
  },
];

export const statusSteps = [
  { label: 'Safety Cleanup Required', body: 'Draft is scanned for hidden metadata and visible private-data risks.', icon: ShieldAlert },
  { label: 'Cleaned Package Generated', body: 'Only cleaned fictional files become part of a signed public package.', icon: BadgeCheck },
  { label: 'Published + Community Review', body: 'Community support, dispute, evidence updates, and status changes begin.', icon: Vote },
];
