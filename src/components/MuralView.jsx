import { useEffect, useState } from 'react';
import { getAvatarForPlayer, getMural } from '../lib/gameApi';
import AvatarToken from './AvatarToken';

function MuralView() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getMural()
      .then(setItems)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="game-section mural-section">
      <div className="section-heading">
        <p className="eyebrow">Mural</p>
        <h2>Reflexões da irmandade</h2>
      </div>

      {error ? <p className="feedback-error">{error}</p> : null}

      <div className="mural-grid">
        {items.length ? (
          items.map((item) => {
            const avatar = getAvatarForPlayer(item);
            return (
              <article className="mural-card" key={item.id}>
                <div className="mural-author">
                  <AvatarToken avatarId={avatar.id} size="sm" />
                  <div>
                    <strong>{item.player_name ?? item.name}</strong>
                    <span>{item.book_name ?? item.book_id}</span>
                  </div>
                </div>
                {item.verse ? <p className="mural-verse">{item.verse}</p> : null}
                <p>{item.note || 'Livro selado na jornada.'}</p>
              </article>
            );
          })
        ) : (
          <p className="empty-state">Nenhuma reflexão compartilhada ainda.</p>
        )}
      </div>
    </section>
  );
}

export default MuralView;
