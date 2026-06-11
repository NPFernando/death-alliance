import { ExternalLink } from 'lucide-react';
import type { CaseReport } from '../types';

type CaseThreadProps = {
  report: CaseReport;
  votes: { up: number; down: number };
  commentVotes: Record<string, { up: number; down: number }>;
  onCaseVote: (vote: 'up' | 'down') => void;
  onCommentVote: (commentId: string, vote: 'up' | 'down') => void;
};

export function CaseThread({ report, votes, commentVotes, onCaseVote, onCommentVote }: CaseThreadProps) {
  return (
    <section className="portal-card case-thread" aria-label="Selected case thread">
      <div className="thread-header">
        <div>
          <p className="eyebrow">Selected thread</p>
          <h2>{report.title}</h2>
          <p className="report-villain">{report.id} · {report.category}</p>
        </div>
        <div className="thread-votes" aria-label={`${report.title} selected thread votes`}>
          <span>▲ {votes.up} upvotes</span>
          <span>▼ {votes.down} downvotes</span>
        </div>
      </div>

      <p className="thread-status">{report.threadSummary}</p>

      <div className="vote-actions thread-actions">
        <button type="button" onClick={() => onCaseVote('up')} aria-label="Support selected case">▲ Support selected case</button>
        <button type="button" onClick={() => onCaseVote('down')} aria-label="Dispute selected case">▼ Dispute selected case</button>
      </div>

      <div className="thread-columns">
        <section aria-label={`${report.title} cleaned evidence`}>
          <h3>Cleaned evidence links</h3>
          <ul className="thread-list">
            {report.evidence.map((item) => <li key={item}><ExternalLink size={14} /> {item}</li>)}
          </ul>
        </section>

        <section aria-label={`${report.title} comment thread`}>
          <h3>Community comments</h3>
          <div className="comment-list">
            {report.commentsList.map((comment) => {
              const votesForComment = commentVotes[comment.id];
              return (
                <article className="comment-card" key={comment.id} aria-label={`${comment.anonymousName} comment`}>
                  <div className="comment-topline">
                    <strong>{comment.anonymousName}</strong>
                    <span>{comment.type.replaceAll('_', ' ')}</span>
                  </div>
                  <p>{comment.body}</p>
                  <div className="comment-actions">
                    <span>{votesForComment.up} upvotes</span>
                    <span>{votesForComment.down} downvotes</span>
                    <button type="button" onClick={() => onCommentVote(comment.id, 'up')} aria-label={`Upvote ${comment.anonymousName} comment`}>▲</button>
                    <button type="button" onClick={() => onCommentVote(comment.id, 'down')} aria-label={`Downvote ${comment.anonymousName} comment`}>▼</button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
