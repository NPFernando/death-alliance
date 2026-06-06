import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';
import { createCaseId, isSubmissionTextSafe, safeCaseStatuses } from './safety';

describe('Death Alliance safe ARG portal', () => {
  it('renders the cinematic fictional archive landing page', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /welcome to the death alliance/i })).toBeInTheDocument();
    expect(screen.getAllByText(/fictional archive/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/fictional \/ ARG \/ roleplay only/i)).toBeInTheDocument();
  });

  it('blocks draft generation until fictional consent and safe minimum fields are present', async () => {
    const user = userEvent.setup();
    render(<App />);

    const submit = screen.getByRole('button', { name: /generate safe draft case/i });
    expect(submit).toBeDisabled();

    await user.type(screen.getByLabelText(/^Anonymous Name/i), 'Silent Witness');
    await user.type(screen.getByLabelText(/^Case Title/i), 'The Stolen Engine');
    await user.type(screen.getByLabelText(/^Case Description/i), 'A fictional case about a betrayed inventor and a stolen engine inside a created story universe.');
    expect(submit).toBeDisabled();

    await user.click(screen.getByRole('checkbox'));
    expect(submit).toBeEnabled();
    await user.click(submit);
    expect(screen.getByText(/Safe draft created: DA-000302-v1/i)).toBeInTheDocument();
  });

  it('rejects unsafe private-data wording in draft text', () => {
    expect(isSubmissionTextSafe('This story contains a fictional archive clue.')).toBe(true);
    expect(isSubmissionTextSafe('Post a real street location for the accused person.')).toBe(false);
    expect(isSubmissionTextSafe('This is revenge against an identifiable real person.')).toBe(false);
  });

  it('uses safe status names and excludes vigilante outcome statuses', () => {
    expect(safeCaseStatuses).toContain('Safety Cleanup Required');
    expect(safeCaseStatuses).toContain('Published');
    expect(safeCaseStatuses.join(' ').toLowerCase()).not.toContain(['under', 'trial'].join(' '));
    expect(safeCaseStatuses.join(' ').toLowerCase()).not.toContain(['judgment', 'completed'].join(' '));
  });

  it('formats deterministic case IDs', () => {
    expect(createCaseId(1)).toBe('DA-000001');
    expect(createCaseId(184)).toBe('DA-000184');
  });
});
