function ChapterView({ chapters }) {
  if (!chapters?.length) return null;

  return (
    <div className="chapter-view">
      {chapters.map((chapter) => (
        <article key={chapter.number}>
          <h3>Capítulo {chapter.number}</h3>
          {chapter.verses.map((verse) => (
            <p key={verse.number}>
              <sup>{verse.number}</sup> {verse.text}
            </p>
          ))}
        </article>
      ))}
    </div>
  );
}

export default ChapterView;
