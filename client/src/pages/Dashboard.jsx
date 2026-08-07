import CharacterCard from "../components/CharacterCard";

const Dashboard = () => {
  const characters = [
    {
      name: "Nikola Tesla",
      role: "Inventor",
      emoji: "⚡",
    },
    {
      name: "Albert Einstein",
      role: "Physicist",
      emoji: "🧠",
    },
    {
      name: "Elon Musk",
      role: "Entrepreneur",
      emoji: "🚀",
    },
  ];
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
      }}
    >
      <h1>Welcome to Einvorix</h1>

      <p>Choose your AI Expert</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        {characters.map((character, index) => (
          <CharacterCard
            key={index}
            name={character.name}
            role={character.role}
            emoji={character.emoji}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
