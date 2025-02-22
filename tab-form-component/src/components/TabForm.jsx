import { useState } from "react";
import Profile from "./Profile";
import Interests from "./Interests";
import Settings from "./Settings";
const TabForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    interests: ["coding", "music"],
    theme: "dark",
  });

  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState({});
  const tabs = [
    {
      title: "Profile",
      component: Profile,
      validate: () => {
        const errs = {};
        if (!data.name) {
          errs.name = "Name is required";
        }
        if (data.name.length < 2) {
          errs.name = "should be atleast 2 characters long";
        }
        if (!data.email) {
          errs.email = "Email is required";
        }
        if (!data.age) {
          errs.age = "Age is required";
        }
        setErrors(errs);
        return errs.email || errs.name || errs.age ? false : true;
      },
    },
    {
      title: "Interests",
      component: Interests,
      validate: () => {
        const errs = {};
        if (data.interests.length === 0) {
          errs.interests = "Atleast one interest is required";
        }
        setErrors(errs);
        return errs.interests ? false : true;
      },
    },
    {
      title: "Settings",
      component: Settings,
    },
  ];
  const ActiveTabComponent = tabs[activeTab].component;

  const handleDataUpdate = (data) => {
    setData((prevData) => ({ ...prevData, ...data }));
  };
  const handleNext = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev - 1);
    }
  };
  return (
    <div>
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="tab"
            onClick={() => tabs[activeTab].validate() && setActiveTab(index)}
            style={{
              backgroundColor: index == activeTab && "black",
              color: index == activeTab && "white",
            }}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="container">
        <ActiveTabComponent
          data={data}
          handleDataUpdate={handleDataUpdate}
          errors={errors}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        {activeTab > 0 && <button onClick={handlePrev}>Previous</button>}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
        {activeTab === tabs.length - 1 && <button>Submit</button>}
      </div>
    </div>
  );
};

export default TabForm;
