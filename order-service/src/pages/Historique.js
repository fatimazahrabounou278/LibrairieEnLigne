import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Historique = () => {
    const [commandes, setCommandes] = useState([]);
    const userId = localStorage.getItem("userId") || "u123";

    useEffect(() => {
        axios.get(`http://localhost:8002/api/commandes/${userId}`)
            .then(res => setCommandes(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>📜 Mes Commandes</h2>
            {commandes.map((cmd, i) => (
                <div key={i}>
                    <p>Commande ID : {cmd._id}</p>
                    <p>Total : {cmd.total} €</p>
                    <p>
                        Items : {cmd.items.map(item => `${item.bookId} x${item.quantity}`).join(', ')}
                    </p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Historique;
