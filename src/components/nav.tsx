import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div className='nav w-screen fixed top-0 left-0 flex items-center justify-center gap-5 h-16'>
            <p className='float-left absolute left-5'>OV</p>
            <Link to="/">Home</Link>
            <Link to="/add">Add</Link>
            <Link to="/edit">Edit</Link>
            <Link to="/hidden">Hidden</Link>
        </div>
    )
}

export default Nav;