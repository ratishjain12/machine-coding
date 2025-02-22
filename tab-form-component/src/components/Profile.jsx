const Profile = ({ data, handleDataUpdate, errors }) => {
  const { name, email, age } = data;
  return (
    <div className="form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => handleDataUpdate({ ...data, name: e.target.value })}
      />
      {errors.name && <p className="error">{errors.name}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => handleDataUpdate({ ...data, email: e.target.value })}
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => handleDataUpdate({ ...data, age: e.target.value })}
      />
      {errors.age && <p className="error">{errors.age}</p>}
    </div>
  );
};

export default Profile;
