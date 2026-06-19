import { isBookComplete, isDayCompleted } from '../lib/gameRules';
import ReadingChip from './ReadingChip';

function BookProgress({ book, progress, sealed, onOpenReading, onSealBook }) {
  const complete = isBookComplete(book, progress);

  return (
    <article className={`book-card ${complete ? 'is-complete' : ''}`}>
      <div className="book-card-heading">
        <div>
          <strong>{book.name}</strong>
          <span>{book.days.length} blocos</span>
        </div>
        {complete && !sealed ? (
          <button className="seal-button" type="button" onClick={() => onSealBook(book)}>
            Selar livro
          </button>
        ) : null}
        {sealed ? <span className="sealed-label">Selado</span> : null}
      </div>

      <div className="reading-grid">
        {book.days.map((day) => (
          <ReadingChip
            completed={isDayCompleted(progress, day.n)}
            day={{ ...day, bookId: day.bookId ?? book.id }}
            key={day.n}
            onOpen={onOpenReading}
          />
        ))}
      </div>
    </article>
  );
}

export default BookProgress;
