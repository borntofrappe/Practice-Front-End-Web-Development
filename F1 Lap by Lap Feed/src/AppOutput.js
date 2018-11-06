import React from 'react';
// import './css/AppOutput.css';

// in a stateless component detail each update in a section
// currently considering only paragraph elements
const AppOutput = (props) => {
  const { updates } = props;
  const sectionUpdates = updates.map((update, key) => {
    const { title, subtitle, update: up } = update;

    return (
      <section key={key}>
        {
          title &&
          <h2>{title}</h2>
        }
        {
          subtitle &&
          <h3>{subtitle}</h3>
        }
        <p>{up}</p>
      </section>
    );
  });
  return (
    <div className="AppOutput">
      {
        sectionUpdates
      }
    </div>
  );
};

export default AppOutput;
