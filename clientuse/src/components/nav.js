import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate} from "react-router-dom";
export const Navbar = () => {
    const [cookies,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const logout = () =>{
        setCookies("access_token","");
        window.localStorage.removeItem("userid");
        navigate("/auth");
    }
    return (
        <header>
            <div className="navbar">
                <nav>
            <Link to="/">Home</Link>
            <Link to="/creation">Create A Recipe</Link>
            <Link to="/saved">Saved</Link>
            {!cookies.access_token ? ( <Link to="/auth">Login/Register</Link>): <button onClick={logout}>Logout</button>}
           </nav>
        </div>
        </header>
    )
 };