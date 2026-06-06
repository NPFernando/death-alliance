export const contentModes = [
  'Fictional / ARG / Roleplay',
  'Novel-inspired scenario',
  'Fictional real-world-style accusation',
  'Worldbuilding case',
  'Story evidence',
  'Lore submission',
  'Fictional whistleblower report',
  'Fictional injustice archive',
] as const;

export const caseCategories = [
  'False Accusation',
  'Murder',
  'Attempted Murder',
  'Technology Theft',
  'Invention Theft',
  'Corporate Espionage',
  'Family Power Abuse',
  'Corruption',
  'Abuse of Authority',
  'Evidence Fabrication',
  'Witness Tampering',
  'Financial Fraud',
  'Medical Experiment Abuse',
  'Human Rights Abuse',
  'Forced Imprisonment',
  'Identity Theft',
  'Betrayal',
  'Blackmail',
  'Cover-Up',
  'Harassment',
  'Cybercrime',
  'Data Theft',
  'AI / Technology Suppression',
  'Humanity-Level Harm',
  'Other',
] as const;

export const safeCaseStatuses = [
  'Draft',
  'Safety Cleanup Required',
  'Cleaned Package Generated',
  'Published',
  'Supported',
  'Strongly Supported',
  'Disputed',
  'Heavily Disputed',
  'Weak Evidence',
  'Needs More Evidence',
  'Counter-Evidence Added',
  'Community Rejected',
  'Flagged Unsafe',
  'Hidden from Main UI',
  'Archived',
  'Deprecated Version',
  'Superseded by New Version',
] as const;

export const publishingSteps = [
  'Anonymous fictional submission',
  'Temporary sandbox upload',
  'Metadata scan',
  'Visible private-data check',
  'User cleanup confirmation',
  'Final cleaned package generated',
  'Package hash generated',
  'Package signed',
  'Final cleaned submission → Direct IPFS/torrent publish',
  'CID/torrent snapshot stored',
  'Public archive updated',
  'Community comments, votes, disputes, and evidence updates',
] as const;

const unsafeTextPatterns = [
  /real\s+(street|home)\s+location/i,
  /real\s+phone/i,
  /national\s+id/i,
  /passport/i,
  /dox/i,
  /threat/i,
  /revenge/i,
  /identifiable\s+real\s+person/i,
];

export function isSubmissionTextSafe(text: string): boolean {
  return !unsafeTextPatterns.some((pattern) => pattern.test(text));
}

export function createCaseId(sequence: number): string {
  return `DA-${sequence.toString().padStart(6, '0')}`;
}
