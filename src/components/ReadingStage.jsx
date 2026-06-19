import { ALL_DAYS, STAGE_BY_ID } from '../data/readingPlan';
import BookProgress from './BookProgress';

function ReadingStage({ selectedStageId, progress, seals, onOpenReading, onSealBook }) {
  const stage = STAGE_BY_ID[selectedStageId];
  if (!stage) return null;

  const stageBookDays = new Set(stage.books.flatMap((book) => book.days.map((day) => day.n)));
  const reviewDays = ALL_DAYS.filter(
    (day) => day.phaseId === stage.id && !stageBookDays.has(day.n),
  );

  return (
    <section className="reading-stage">
      <div className="section-heading">
        <p className="eyebrow">{stage.shortName}</p>
        <h2>{stage.name}</h2>
        <p>{stage.subtitle}</p>
      </div>

      <div className="books-stack">
        {stage.books.map((book) => (
          <BookProgress
            book={book}
            key={book.id}
            onOpenReading={(day) =>
              onOpenReading({
                ...day,
                bookName: book.name,
                phaseId: stage.id,
                phaseName: stage.name,
              })
            }
            onSealBook={onSealBook}
            progress={progress}
            sealed={seals.some((seal) => seal.book_id === book.id)}
          />
        ))}
        {reviewDays.length ? (
          <BookProgress
            book={{
              id: `${stage.id}-revisao`,
              name: 'Desafios de revisão',
              abbr: 'DR',
              days: reviewDays,
            }}
            onOpenReading={(day) =>
              onOpenReading({
                ...day,
                phaseId: stage.id,
                phaseName: stage.name,
              })
            }
            onSealBook={() => {}}
            progress={progress}
            sealed
          />
        ) : null}
      </div>
    </section>
  );
}

export default ReadingStage;
