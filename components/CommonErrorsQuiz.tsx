'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { QUIZ, type QuizQuestion } from '@/lib/quiz-data';

interface QuizStrings {
  heading: string;
  intro: string;
  scoreLabel: string; // "{correct} / {answered} correct ({total} in total)"
  resetLabel: string;
  correctLabel: string;
  wrongLabel: string;
  exampleLabel: string;
}

const resetBtn: React.CSSProperties = {
  padding: '4px 12px',
  borderRadius: 'var(--radius-full)',
  border: '1px solid var(--color-border-default)',
  background: 'var(--color-bg-icon-tile)',
  color: 'var(--color-text-secondary)',
  fontSize: '0.8rem',
  cursor: 'pointer',
  fontWeight: 600,
};

export default function CommonErrorsQuiz(strings: QuizStrings) {
  const { heading, intro, scoreLabel, resetLabel, correctLabel, wrongLabel, exampleLabel } = strings;
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const stages = useMemo(() => {
    const order: string[] = [];
    for (const q of QUIZ) if (!order.includes(q.stage)) order.push(q.stage);
    return order.map((stage) => ({ stage, items: QUIZ.filter((q) => q.stage === stage) }));
  }, []);

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(
    ([id, idx]) => QUIZ.find((q) => q.id === id)?.options[idx]?.correct,
  ).length;

  function select(q: QuizQuestion, idx: number) {
    if (answers[q.id] !== undefined) return; // lock once answered
    setAnswers((a) => ({ ...a, [q.id]: idx }));
  }

  const score = scoreLabel
    .replace('{correct}', String(correctCount))
    .replace('{answered}', String(answeredCount))
    .replace('{total}', String(QUIZ.length));

  return (
    <section
      aria-labelledby="quiz-heading"
      style={{ marginTop: '44px', paddingTop: '28px', borderTop: '1px solid var(--color-border-default)' }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <h2 id="quiz-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
          {heading}
        </h2>
        {answeredCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{score}</span>
            <button type="button" onClick={() => setAnswers({})} style={resetBtn}>{resetLabel}</button>
          </div>
        )}
      </div>
      <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px', fontSize: '0.9rem' }}>{intro}</p>

      {stages.map(({ stage, items }) => (
        <div key={stage} style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-amber-400)', margin: '0 0 12px' }}>
            {stage}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map((q) => {
              const chosen = answers[q.id];
              const answered = chosen !== undefined;
              return (
                <div key={q.id} className="doc-card" style={{ margin: 0 }}>
                  <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px', lineHeight: 1.5 }}>{q.prompt}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, i) => {
                      const isChosen = chosen === i;
                      let bg = 'var(--color-bg-icon-tile)';
                      let border = '1px solid var(--color-border-default)';
                      let color = 'var(--color-text-secondary)';
                      if (answered) {
                        if (opt.correct) {
                          bg = '#0D2B1A'; border = '1px solid #14532D'; color = '#86EFAC';
                        } else if (isChosen) {
                          bg = '#3B0D0D'; border = '1px solid #7F1D1D'; color = '#FCA5A5';
                        } else {
                          color = 'var(--color-text-muted)';
                        }
                      }
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => select(q, i)}
                          disabled={answered}
                          aria-pressed={isChosen}
                          style={{
                            textAlign: 'left', padding: '10px 14px', borderRadius: 'var(--radius-md)',
                            background: bg, border, color, cursor: answered ? 'default' : 'pointer',
                            fontSize: '0.9rem', lineHeight: 1.45, transition: 'background 120ms', width: '100%',
                          }}
                        >
                          <span style={{ fontWeight: 700, marginRight: '8px', opacity: 0.75 }}>{String.fromCharCode(65 + i)}</span>
                          {opt.text}
                          {answered && opt.correct && <span style={{ float: 'right', fontWeight: 700 }}>✓ {correctLabel}</span>}
                          {answered && isChosen && !opt.correct && <span style={{ float: 'right', fontWeight: 700 }}>✗ {wrongLabel}</span>}
                        </button>
                      );
                    })}
                  </div>
                  {answered && (
                    <div
                      role="note"
                      style={{
                        marginTop: '12px', padding: '12px 16px', borderLeft: '3px solid var(--color-amber-700)',
                        background: 'var(--color-bg-callout-info)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                        fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.55,
                      }}
                    >
                      {q.explanation}
                      {q.exampleSlug && (
                        <>
                          {' '}
                          <Link href={`/examples/${q.exampleSlug}` as `/${string}`} style={{ color: 'var(--color-amber-400)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                            {exampleLabel} →
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
