import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { CaseThread } from '../components/CaseThread';
import { PageHeader } from '../components/PageHeader';
import { exampleReports, recentCases } from '../data';

const clip2 = new URL('../../vid/clip 2.mp4', import.meta.url).href;

export function ArchivePage() {
  const [selectedReportId, setSelectedReportId] = useState(exampleReports[0].id);
  // Demo-only: votes live in memory and reset on page reload
  const [caseVotes, setCaseVotes] = useState(() => Object.fromEntries(exampleReports.map((report) => [report.id, report.votes])));
  const [commentVotes, setCommentVotes] = useState(() => Object.fromEntries(
    exampleReports.flatMap((report) => report.commentsList.map((comment) => [comment.id, comment.votes])),
  ));
  const [bumpedVotes, setBumpedVotes] = useState<Set<string>>(() => new Set());

  const selectedReport = exampleReports.find((report) => report.id === selectedReportId) ?? exampleReports[0];

  function bumpVote(key: string) {
    setBumpedVotes((current) => new Set([...current, key]));
    window.setTimeout(() => {
      setBumpedVotes((current) => { const s = new Set(current); s.delete(key); return s; });
    }, 400);
  }

  function voteCase(reportId: string, vote: 'up' | 'down') {
    setCaseVotes((current) => ({
      ...current,
      [reportId]: {
        ...current[reportId],
        [vote]: current[reportId][vote] + 1,
      },
    }));
    bumpVote(`${reportId}-${vote}`);
  }

  function voteComment(commentId: string, vote: 'up' | 'down') {
    setCommentVotes((current) => ({
      ...current,
      [commentId]: {
        ...current[commentId],
        [vote]: current[commentId][vote] + 1,
      },
    }));
    bumpVote(`comment-${commentId}-${vote}`);
  }

  return (
    <section className="page-section archive-section" aria-labelledby="archive-title">
      <video className="page-bg-video" autoPlay muted loop playsInline aria-hidden="true">
        <source src={clip2} type="video/mp4" />
      </video>

      <PageHeader eyebrow="Community dispute layer" title="Recent fictional cases" body="Archive cards now open connected thread views. Demo votes update in memory only; a production build would connect them to anonymous identity, reputation, and append-only event services." />

      <section className="example-report-grid" aria-label="Example fictional archive reports">
        {exampleReports.map((report) => {
          const votes = caseVotes[report.id];
          const selected = selectedReport.id === report.id;
          return (
            <article className={`portal-card example-report${selected ? ' selected-report' : ''}`} key={report.id} aria-label={`${report.title} case card`}>
              <div className="report-topline">
                <span className="case-id">{report.id}</span>
                <span className="status-pill">{report.status}</span>
              </div>
              <h2>{report.title}</h2>
              <p className="report-villain">{report.villain} · {report.category}</p>
              <p>{report.summary}</p>
              <div className="report-signals" aria-label={`${report.title} community signals`}>
                <span className={bumpedVotes.has(`${report.id}-up`) ? 'vote-bump' : undefined}>▲ {votes.up} upvotes</span>
                <span className={bumpedVotes.has(`${report.id}-down`) ? 'vote-bump' : undefined}>▼ {votes.down} downvotes</span>
                <span>{report.comments} comments</span>
              </div>
              <div className="vote-actions" aria-label={`${report.title} voting actions`}>
                <button type="button" onClick={() => voteCase(report.id, 'up')} aria-label={`Upvote ${report.title}`}>▲ Upvote</button>
                <button type="button" onClick={() => voteCase(report.id, 'down')} aria-label={`Downvote ${report.title}`}>▼ Downvote</button>
                <button type="button" onClick={() => setSelectedReportId(report.id)} aria-label={`Open thread for ${report.title}`}>Open thread</button>
              </div>
              <div className="evidence-links" aria-label={`${report.title} evidence links`}>
                {report.evidence.map((item) => (
                  <button type="button" key={item} onClick={() => setSelectedReportId(report.id)}><ExternalLink size={14} /> {item}</button>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <CaseThread
        report={selectedReport}
        votes={caseVotes[selectedReport.id]}
        commentVotes={commentVotes}
        bumpedVotes={bumpedVotes}
        onCaseVote={(vote) => voteCase(selectedReport.id, vote)}
        onCommentVote={voteComment}
      />

      <section className="portal-card recent-panel archive-page-card">
        <div className="panel-head">
          <span className="panel-caret">›_</span>
          <div>
            <p className="eyebrow">Compact archive index</p>
            <h2>Live-style archive table</h2>
          </div>
        </div>
        <div className="case-table" role="table" aria-label="Recent fictional cases">
          <div className="case-row table-head" role="row">
            <span>ID</span><span>Title</span><span>Status</span><span>Signals</span>
          </div>
          {recentCases.map((item) => (
            <button className="case-row case-row-button" role="row" key={item.id} type="button" onClick={() => setSelectedReportId(exampleReports[0].id)}>
              <span className="case-id">{item.id}</span>
              <strong>{item.title}</strong>
              <span className="status-pill">{item.status}</span>
              <span>{item.updated}</span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
