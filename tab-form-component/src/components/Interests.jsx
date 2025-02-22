const Interests = ({ data, handleDataUpdate, errors }) => {
  const { interests } = data;

  const handleDataChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      handleDataUpdate({
        ...data,
        interests: [...interests, name],
      });
    } else {
      handleDataUpdate({
        ...data,
        interests: interests.filter((interest) => interest !== name),
      });
    }
  };

  return (
    <div className="form">
      <label>
        <input
          type="checkbox"
          name="coding"
          checked={interests.includes("coding")}
          onChange={handleDataChange}
        />
        Coding
      </label>
      <label>
        <input
          type="checkbox"
          name="music"
          checked={interests.includes("music")}
          onChange={handleDataChange}
        />
        Music
      </label>
      <label>
        <input
          type="checkbox"
          name="javascript"
          checked={interests.includes("javascript")}
          onChange={handleDataChange}
        />
        Javascript
      </label>
      {errors.interests && <p className="error">{errors.interests}</p>}
    </div>
  );
};

export default Interests;
