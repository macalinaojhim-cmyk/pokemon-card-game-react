
export default function ScoreBoard(){

    return(
        <div className="score-board">
            <div>
                <div className="game-name">
                <h1>Card Game</h1>
            </div>
            <div className="rule">
                <p>click the card only once</p>
            </div>
            <div className="scores">
                <p className="current-score">Score: 0</p>
                <p className="high-score">Highest Score: 0</p>
            </div>
            </div>
        </div>
    )
}