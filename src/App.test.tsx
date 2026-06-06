import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { createCaseId, isSubmissionTextSafe, safeCaseStatuses } from './safety';

describe('Death Alliance safe ARG portal', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  afterEach(() => {
    vi.useRealTimers();
    window.location.hash = '';
  });

  it('renders the cinematic fictional archive landing page', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /welcome to the death alliance/i })).toBeInTheDocument();
    expect(screen.getAllByText(/fictional archive/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/fictional \/ ARG \/ roleplay only/i)).toBeInTheDocument();
  });

  it('renders a skippable Clip 1 cinematic loading overlay before the archive UI', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByLabelText(/death alliance cinematic loading screen/i)).toBeInTheDocument();
    expect(screen.getByText(/initializing fictional archive/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /skip intro/i }));

    expect(screen.queryByLabelText(/death alliance cinematic loading screen/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /welcome to the death alliance/i })).toBeInTheDocument();
  });

  it('can replay the cinematic intro from the top bar', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /skip intro/i }));
    expect(screen.queryByLabelText(/death alliance cinematic loading screen/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /replay intro/i }));
    expect(screen.getByLabelText(/death alliance cinematic loading screen/i)).toBeInTheDocument();
  });

  it('keeps the intro visible until Clip 1 finishes or the user skips it', () => {
    vi.useFakeTimers();
    render(<App />);

    expect(screen.getByLabelText(/death alliance cinematic loading screen/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5200);
    });

    expect(screen.getByLabelText(/death alliance cinematic loading screen/i)).toBeInTheDocument();
  });

  it('uses separate hash-routed pages for each menu item', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nav = screen.getByRole('navigation', { name: /death alliance sections/i });

    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /welcome to the death alliance/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /safe draft case/i })).not.toBeInTheDocument();

    await user.click(within(nav).getByRole('link', { name: /submit clue/i }));
    expect(await screen.findByRole('heading', { name: /safe draft case/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /welcome to the death alliance/i })).not.toBeInTheDocument();

    await user.click(within(nav).getByRole('link', { name: /archive/i }));
    expect(await screen.findByRole('heading', { name: /recent fictional cases/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /safe draft case/i })).not.toBeInTheDocument();

    await user.click(within(nav).getByRole('link', { name: /manifest/i }));
    expect(await screen.findByRole('heading', { name: /cleaned archive flow/i })).toBeInTheDocument();

    await user.click(within(nav).getByRole('link', { name: /rules/i }));
    expect(await screen.findByRole('heading', { name: /safety boundary/i })).toBeInTheDocument();

    await user.click(within(nav).getByRole('link', { name: /status/i }));
    expect(await screen.findByRole('heading', { name: /latest signed manifest/i })).toBeInTheDocument();
  });

  it('deep-links directly to a separate page from the URL hash', () => {
    window.location.hash = '#/archive';
    render(<App />);

    expect(screen.getByRole('heading', { name: /recent fictional cases/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /welcome to the death alliance/i })).not.toBeInTheDocument();
  });

  it('renders the CloudScope-style dark operations shell around routed pages', () => {
    render(<App />);

    expect(screen.getByRole('navigation', { name: /death alliance sections/i })).toBeInTheDocument();
    expect(screen.getByText(/daemon net/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cinematic death alliance background loop/i)).toBeInTheDocument();
  });

  it('blocks draft generation until fictional consent and safe minimum fields are present', async () => {
    const user = userEvent.setup();
    window.location.hash = '#/submit';
    render(<App />);

    const submit = screen.getByRole('button', { name: /generate safe draft case/i });
    expect(submit).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/^Anonymous Name/i), { target: { value: 'Silent Witness' } });
    fireEvent.change(screen.getByLabelText(/^Case Title/i), { target: { value: 'The Stolen Engine' } });
    fireEvent.change(screen.getByLabelText(/^Case Description/i), { target: { value: 'A fictional case about a betrayed inventor and a stolen engine inside a created story universe.' } });
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
