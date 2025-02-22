const Settings = ({ data, handleDataUpdate }) => {
  const { theme } = data;
  return (
    <div className="form">
      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={(e) => handleDataUpdate({ ...data, theme: e.target.value })}
        />
        Dark
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange={(e) => handleDataUpdate({ ...data, theme: e.target.value })}
        />
        Light
      </label>
    </div>
  );
};

export default Settings;
