import React from "react";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2 className="logo">Pustak Admin</h2>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Users</li>
            <li>Books</li>
            <li>Transactions</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <div className="main">
        <header className="header">
          <h1>Admin Dashboard</h1>
          <div className="admin-info">
            <span>Welcome, Admin</span>
            <button className="logout-btn">Logout</button>
          </div>
        </header>

        <section className="dashboard-cards">
          <Card title="Total Users" value="1,240" color="#4CAF50" />
          <Card title="Total Books" value="82" color="#2196F3" />
          <Card title="Downloads" value="3,456" color="#FF9800" />
          <Card title="Points Used" value="8,920" color="#E91E63" />
        </section>

        <section className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button>Add Book</button>
            <button>Manage Users</button>
            <button>View Transactions</button>
          </div>
        </section>
      </div>

      {/* Internal CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body, html {
          font-family: Arial, sans-serif;
        }

        .admin-container {
          display: flex;
          height: 100vh;
          background-color: #f4f6f8;
        }

        .sidebar {
          width: 220px;
          background-color: #1e1e2f;
          color: white;
          padding: 20px;
        }

        .logo {
          font-size: 22px;
          margin-bottom: 30px;
        }

        .sidebar ul {
          list-style: none;
        }

        .sidebar li {
          padding: 10px 15px;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.3s;
        }

        .sidebar li:hover,
        .sidebar li.active {
          background-color: #2d2d44;
        }

        .main {
          flex: 1;
          padding: 20px;
        }

        .header {
          background-color: white;
          padding: 15px 20px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }

        .admin-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logout-btn {
          background-color: #e53935;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .logout-btn:hover {
          background-color: #c62828;
        }

        .dashboard-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .card {
          background-color: white;
          border-left: 6px solid;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .card-title {
          font-size: 14px;
          color: #555;
          margin-bottom: 10px;
        }

        .card-value {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .dashboard-section h2 {
          margin-bottom: 15px;
        }

        .quick-actions {
          display: flex;
          gap: 15px;
        }

        .quick-actions button {
          padding: 10px 20px;
          background-color: #3f51b5;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .quick-actions button:hover {
          background-color: #2c387e;
        }
      `}</style>
    </div>
  );
};

const Card = ({ title, value, color }) => {
  return (
    <div className="card" style={{ borderLeftColor: color }}>
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </div>
  );
};

export default AdminDashboard;
