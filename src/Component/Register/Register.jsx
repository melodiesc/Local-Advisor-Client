// import React, { useState } from 'react';
// import "./Register.css";

// const RegistrationForm = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [pseudo, setPseudo] = useState('');
//   const [birthDate, setBirthDate] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setFirstName('');
//     setLastName('');
//     setEmail('');
//     setPassword('');
//     setPseudo('');
//     setBirthDate('');
//   };

//   return (
//     <div>
//       <div className="form">
//         <ul className="tab-group">
//           <li className="tab active"><a href="#membre" style={{ borderRadius: '15px', marginRight: '8px' }}>Membre</a></li>
//           <li className="tab"><a href="#gerant" style={{ borderRadius: '15px', marginLeft: '8px' }}>Gérant</a></li>
//         </ul>
//         <div className="tab-content">
//           <div id="user">
//             <h1>Membre</h1>
//             <form action="/" method="post">
//               <div className="top-row">
//                 <div className="field-wrap">
//                   <input type="text" required placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                 </div>
//                 <div className="field-wrap">
//                   <input type="text" required placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                 </div>
//               </div>
//               <div className="field-wrap">
//                 <input type="email" required placeholder="Addresse mail" value={email} onChange={(e) => setEmail(e.target.value)} />
//               </div>
//               <div className="field-wrap">
//                 <input type="password" required placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
//               </div>
//               <div className="field-wrap">
//                 <input type="text" required placeholder="Pseudo" value={pseudo} onChange={(e) => setPassword(e.target.value)} />
//               </div>
//               <label>Date de naissance:</label>
//               <div className="field-wrap">
//                 <input type="date" required placeholder="Date de naissance" value={birthDate} onChange={(e) => setPassword(e.target.value)} />
//               </div>
//               <button type="submit" className="button button-block" onClick={handleSubmit}>S'incrire</button>
//             </form>
//           </div>

//           <div id="owner">
//             <h1>Gérant</h1>
//             <form action="/" method="post">
//               <div className="top-row">
//                 <div className="field-wrap">
//                   <input type="text" required placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                 </div>
//                 <div className="field-wrap">
//                   <input type="text" required placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                 </div>
//               </div>
//               <div className="field-wrap">
//                 <input type="email" required placeholder="Addresse mail" value={email} onChange={(e) => setEmail(e.target.value)} />
//               </div>
//               <div className="field-wrap">
//                 <input type="password" required placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
//               </div>
//               <div className="field-wrap">
//                 <input type="text" required placeholder="Pseudo" value={pseudo} onChange={(e) => setPassword(e.target.value)} />
//               </div>
//               <label>Date de naissance:</label>
//               <div className="field-wrap">
//                 <input type="date" required placeholder="Date de naissance" value={birthDate} onChange={(e) => setPassword(e.target.value)} />
//               </div>
//               <button type="submit" className="button button-block" onClick={handleSubmit}>S'incrire</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;

// Votre composant React pour le formulaire d'inscription

// RegisterForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        birth_date: '',
        pseudo: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/register', formData);
            console.log(response.data);
            // Ajoutez ici la redirection ou la gestion de l'état après l'inscription réussie
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom:</label>
                <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Prénom:</label>
                <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Date de naissance:</label>
                <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Pseudo:</label>
                <input
                    type="text"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Mot de passe:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <button type="submit">S'inscrire</button>
            </div>
        </form>
    );
};

export default RegisterForm;
