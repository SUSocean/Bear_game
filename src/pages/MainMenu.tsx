import {Link} from "react-router-dom";

const MainMenu = () => {
    return (
        <div className="mainscreen">
            <Link to="/game" className="mainscreen_link">Start Game</Link>
            <Link to="/rules" className="mainscreen_link">Rules</Link>
        </div>
    )
}

export default MainMenu