import './AccountCard.css';

export const AccountCard = ({ name, industry, phone }) => {
  return (
    <div className="account-card">
      <div className="account-card-header">
        <h3 className="account-card-title">{name}</h3>
      </div>
      <div className="account-card-body">
        <p><strong>Industria:</strong> {industry || 'No especificada'}</p>
        <p><strong>Teléfono:</strong> {phone || 'Sin teléfono registrado'}</p>
      </div>
    </div>
  );
};