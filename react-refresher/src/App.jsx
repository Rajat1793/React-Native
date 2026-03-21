import { useState, useEffect } from "react";
import UserCard from "./components/UserCard";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            const url = 'https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10';
            const options = {method: 'GET', headers: {accept: 'application/json'}};

            try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setUsers(result?.data?.data ?? []);
            } catch (error) {
            console.error(error);
            setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ marginBottom: "16px" }}>Random Users</h1>

            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: "crimson" }}>{error}</p>}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "16px",
                }}
            >
                {users.map((user) => (
                    <UserCard key={user.login.uuid} user={user} />
                ))}
            </div>
        </div>
    )
}

export default App;


// import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

// function App() {
//     return (
//         <BrowserRouter>

//         <nav style={{ padding: "12px", backgroundColor: "#f0f0f0", marginBottom: "24px" }}>
//             <Link to="/" style={{ marginRight: "16px", textDecoration: "none", color: "#333" }}>Home</Link>
//             <Link to="/about" style={{ marginRight: "16px", textDecoration: "none", color: "#333" }}>About</Link>
//             <Link to="/contact" style={{ textDecoration: "none", color: "#333" }}>Contact</Link>
//         </nav>

//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/contact" element={<Contact />} />
//             </Routes>
//         </BrowserRouter>
//     )
// }

// export default App;

// useMemo //useCallback