import { useState } from 'react';

function PlayerInfo({initialName, symbol, isActive, onChangeName}) {
  const [playerName , setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing((editing) =>!editing);

    
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let playerBtn = "Edit";
  if (isEditing) {
    playerBtn = "Save";
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
  }


    return (
        <li className={isActive ? "active" : undefined}>
          <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEdit}>{playerBtn}</button>
        </li>
    )
}

export default PlayerInfo