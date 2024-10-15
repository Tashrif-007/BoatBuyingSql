import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [boats, setBoats] = useState([]);
    const [selectedBoat, setSelectedBoat] = useState("");
    const [ownedBoats, setOwnedBoats] = useState([]);

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        navigate('/');
    };

    // Fetch all available boats
    useEffect(() => {
        const fetchBoats = async () => {
            const response = await fetch('http://localhost:3000/boats/getBoats'); // Adjust the endpoint as necessary
            const data = await response.json();
            setBoats(data);
        };

        fetchBoats();
    }, []);


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return; 

        const fetchOwnedBoats = async () => {
            const response = await fetch(`http://localhost:3000/buy/ownBoats/${userId}`);
            const data = await response.json();
            setOwnedBoats(data);
        };

        fetchOwnedBoats();
    }, []);

 
    const buyBoat = async () => {
        const userId = localStorage.getItem('userId');

        if (!userId || !selectedBoat) {
            alert("Please select a boat to buy.");
            return;
        }

        const res = await fetch('http://localhost:3000/buy/own', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: parseInt(userId), 
                boatId: parseInt(selectedBoat), 
                buyDate: new Date(),
            }),
        });

        if (res.ok) {
            alert("Boat purchased successfully!");
            setSelectedBoat(""); 
        } else {
            const errorData = await res.json();
            alert(`Error purchasing boat: ${errorData.message}`);
        }
    };

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>

            <h2>Available Boats</h2>
            <select value={selectedBoat} onChange={(e) => setSelectedBoat(e.target.value)}>
                <option value="">Select a boat</option>
                {boats.map((boat) => (
                    <option key={boat.id} value={boat.id}>
                        {boat.boatname}
                    </option>
                ))}
            </select>
            <button onClick={buyBoat}>Buy Boat</button>

            <h2>Boats You Own</h2>
            <ul>
                {ownedBoats.length === 0 ? (
                    <li>You dont own any boats yet.</li>
                ) : (
                    ownedBoats.map((ownership) => (
                        <li key={ownership.id}>
                            {ownership.boat.boatname} (Color: {ownership.boat.color}, Purchased on:{" "}
                            {new Date(ownership.buyDate).toLocaleDateString()})
                        </li>
                    ))
                )}
            </ul>
            <button onClick={logout}>Log Out</button>
        </div>
    );
};

export default Home;
