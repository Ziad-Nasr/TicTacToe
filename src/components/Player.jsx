import { useState } from "react";

export default function Player({ initialName, symbol, isActive, changeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            placeholder="Your Name"
            onChange={handleChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button
        onClick={() => {
          setIsEditing((editing) => !editing);
          if (isEditing) changeName(symbol, playerName);
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
