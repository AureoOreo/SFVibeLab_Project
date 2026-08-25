import { useState } from 'react';
import sampleAccounts from './data/Account_Sample_Data.json';
import { AccountCard } from './components/AccountCard';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = sampleAccounts.filter((acc) => {
    const query = searchTerm.toLowerCase().trim();
    const matchesName = acc.Name ? acc.Name.toLowerCase().includes(query) : false;
    const matchesIndustry = acc.Industry ? acc.Industry.toLowerCase().includes(query) : false;
    return matchesName || matchesIndustry;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Account Explorer</h1>
        <p>Explorador local de cuentas</p>
      </header>

      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o industria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="results-count">
          {filteredAccounts.length} cuenta(s) encontrada(s)
        </span>
      </div>

      {filteredAccounts.length > 0 ? (
        <div className="account-grid">
          {filteredAccounts.map((acc, index) => (
            <AccountCard
              key={acc.Id || index}
              name={acc.Name}
              industry={acc.Industry}
              phone={acc.Phone}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No se encontraron cuentas</h3>
          <p>No hay registros que coincidan con "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
}

export default App;