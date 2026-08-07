const CharacterCard = ({ name, role, emoji }) => {
  return (
    <div
      style={{
        width: "220px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        textAlign: "center",
        cursor: "pointer",
        background: "white",
      }}
    >
      <h2>
        {emoji} {name}
      </h2>

      <p>{role}</p>

      <button>Start Chat</button>
    </div>
  );
};

export default CharacterCard;
