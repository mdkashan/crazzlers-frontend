import { MdError } from 'react-icons/md'
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="container not-found">
            <MdError />
            <h1>Not Found Page</h1>
            <Link to="/" className='btn'>Go to Home</Link>
        </div>
    )
};

export default NotFound;