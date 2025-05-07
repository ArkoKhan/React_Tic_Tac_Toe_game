import PlayerInfo from "./PlayerInfo";

function Players() {
    return (
        <ol id="players">
            <PlayerInfo name="Player 1" symbol="X" />
            <PlayerInfo name="Player 2" symbol="O" />
        </ol>
    )
}

export default Players