import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();

  const character = location.state?.character;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Chat Page</h1>

      {character ? (
        <>
          <h2>
            {character.emoji} {character.name}
          </h2>
          <p>{character.role}</p>
        </>
      ) : (
        <h2>No Character Selected</h2>
      )}
    </div>
  );
};

export default Chat;
