import { AVATAR_BY_ID } from '../data/avatars';

function AvatarToken({ avatarId, size = 'md', label }) {
  const avatar = AVATAR_BY_ID[avatarId] ?? AVATAR_BY_ID.peregrino;

  return (
    <span
      className={`avatar-token avatar-token-${size}`}
      style={{ '--avatar-color': avatar.color }}
      aria-label={label ?? avatar.name}
    >
      {avatar.image ? <img src={avatar.image} alt="" /> : <span>{avatar.emojiFallback}</span>}
    </span>
  );
}

export default AvatarToken;
