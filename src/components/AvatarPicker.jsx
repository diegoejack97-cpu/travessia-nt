import { AVATARS } from '../data/avatars';
import AvatarToken from './AvatarToken';

function AvatarPicker({ selectedAvatarId, onSelect }) {
  return (
    <div className="avatar-picker">
      {AVATARS.map((avatar) => {
        const selected = selectedAvatarId === avatar.id;
        return (
          <button
            className={`avatar-card ${selected ? 'is-selected' : ''}`}
            key={avatar.id}
            type="button"
            onClick={() => onSelect(avatar.id)}
          >
            <AvatarToken avatarId={avatar.id} size="lg" />
            <strong>{avatar.name}</strong>
            <span>{avatar.title}</span>
          </button>
        );
      })}
    </div>
  );
}

export default AvatarPicker;
