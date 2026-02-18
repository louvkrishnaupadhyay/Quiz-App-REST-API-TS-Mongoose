import { Link } from 'react-router-dom';
import Style from './MainMenu.module.css'

function MainMenu(){
    return <header className={Style.header}>
        <Link to="/" className={Style.link}>Home</Link>
        <Link to="/Report" className={Style.link}>Report</Link>
        <Link to="/Login" className={Style.link}>Login</Link>
        <Link to="/CreateQuiz" className={Style.link}>CreateQuiz</Link>
        <Link to="/Dashboard" className={Style.link}>Dashboard</Link>
    </header>
}

export default MainMenu;