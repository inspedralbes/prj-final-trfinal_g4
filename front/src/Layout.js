import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/hi">Hi</Link>
                        </li>
                    </ul>
                </nav>


            </header>
        <Outlet />
        </div >
    )
};

export { Layout };