// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import axios from "axios"; // ✅ import axios
// import "../style/dashboard.css";

// const Dashboard = () => {
//   const [materials, setMaterials] = useState([]);
//   const [idToken, setIdToken] = useState(null);
//   const navigate = useNavigate();

//   // ✅ Fetch materials & token
//   useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (!user) {
//           console.log("User not logged in");
//           return;
//         }

//         // ✅ Get fresh Firebase token
//         const token = await user.getIdToken(true);
//         setIdToken(token);

//         console.log("Firebase ID Token:", token);

//         // ✅ Axios call to your backend
//         const res = await axios.get(
//           "http://localhost:5000/api/study/my-materials", // 🔁 updated URL
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );


//         setMaterials(res.data);
//       } catch (err) {
//         console.error("Error fetching study materials:", err);
//       }
//     };

//     fetchMaterials();
//   }, []);

//   // ✅ Handle Create New
//   const handleSubmit = () => {
//     if (!idToken) {
//       alert("Please wait until your authentication is verified.");
//       return;
//     }
//     // ✅ Pass token to /inputform page
//     navigate("/inputform", { state: { idToken } });
//   };

//   // ✅ Extract username
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const userName = user?.displayName || user?.email?.split("@")[0] || "User";

//   return (
//     <>
//       <div className="dashboard-container">
//         {/* Sidebar */}
//         <aside className="sidebar">
//           <div className="logo">
//             <div className="logo-icon">
//               <svg viewBox="0 0 40 40" fill="none">
//                 <circle cx="20" cy="20" r="18" fill="#2563eb" />
//                 <path
//                   d="M20 8 L20 32 M12 20 Q20 12, 28 20"
//                   stroke="white"
//                   strokeWidth="3"
//                   fill="none"
//                 />
//               </svg>
//             </div>
//             <span className="logo-text">LearnSphere</span>
//           </div>

//           <button className="create-btn" onClick={handleSubmit}>
//             + Create New
//           </button>

//           <nav className="nav-menu">
//             <button className="nav-item active">Dashboard</button>
//             <button className="nav-item">Upgrade</button>
//             <button className="nav-item">Profile</button>
//           </nav>

//           <div className="credits-widget">
//             <h3 className="credits-title">Available Credits : 5</h3>
//             <div className="credits-bar">
//               <div className="credits-progress"></div>
//             </div>
//             <p className="credits-text">1 Out of 5 Credits Used</p>
//             <a href="#" className="credits-link">
//               Upgrade to create more
//             </a>
//             <div className="lightning-icon">⚡</div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="main-content">
//           {/* Header */}
//           <header className="header">
//             <div className="user-avatar">{userName[0].toUpperCase()}</div>
//           </header>

//           {/* Welcome Banner */}
//           <div className="welcome-banner">
//             <div className="laptop-icon"></div>
//             <div>
//               <h1 className="welcome-title">Hello, {userName}</h1>
//               <p className="welcome-subtitle">
//                 Welcome back! Continue learning and growing 🌱
//               </p>
//             </div>
//           </div>

//           {/* Study Materials */}
//           <section className="study-materials">
//             <h2 className="section-title">Your Study Material</h2>

//             <div className="courses-grid">
//               {materials.length === 0 ? (
//                 <p>No study materials yet. Click <b>Create New</b> to generate your first one!</p>
//               ) : (
//                 materials.map((material) => (
//                   <div key={material._id} className="course-card">
//                     <div className="course-icon">📘</div>
//                     <div className="course-date">
//                       {new Date(material.createdAt).toLocaleDateString()}
//                     </div>
//                     <h3 className="course-title">{material.topic}</h3>
//                     <p className="course-description">
//                       {material.gradeLevel} | {material.subject}
//                     </p>
//                     <pre className="material-output">
//                       {material.output.slice(0, 120)}...
//                     </pre>
//                   </div>
//                 ))
//               )}
//             </div>
//           </section>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import "../style/dashboard.css";

const Dashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [idToken, setIdToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return console.log("User not logged in");

        const token = await user.getIdToken(true);
        setIdToken(token);

        console.log("Firebase ID Token:", token);

        // 🔁 Updated working URL
        const res = await axios.get(
          "http://localhost:5000/api/study/my-materials",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Fetched materials:", res.data);
        setMaterials(res.data);
      } catch (err) {
        console.error("Error fetching study materials:", err);
      }
    };

    fetchMaterials();
  }, []);

  const handleSubmit = () => {
    if (!idToken) return alert("Wait for authentication verification");
    navigate("/inputform", { state: { idToken } });
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">📚</div>
          <span className="logo-text">LearnSphere</span>
        </div>
        <button className="create-btn" onClick={handleSubmit}>+ Create New</button>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="user-avatar">{userName[0].toUpperCase()}</div>
        </header>

        <section className="study-materials">
          <h2>Your Study Materials</h2>
          {materials.length === 0 ? (
            <p>No study materials yet. Click <b>Create New</b> to generate your first one!</p>
          ) : (
            <div className="courses-grid">
              {materials.map((material) => (
                <div key={material._id} className="course-card">
                  <div className="course-icon">📘</div>
                  <h3 className="course-title">{material.title}</h3>
                  <p className="course-description">
                    {material.academicLevel} | {material.subject} | {material.difficulty}
                  </p>
                  <pre className="material-output">
                    {material.output.notes.slice(0, 200)}...
                  </pre>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
