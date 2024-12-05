import React from 'react';

const EmergencyPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.alertBox}>
        <h1 style={styles.heading}>ALERTS</h1>
        <p style={styles.alertText}>
          - Severe Cyclone expected in coastal regions. Evacuation centers are open.<br />
          - Heavy rainfall warning in northern areas. Avoid unnecessary travel.<br />
          - Wildfire alert in the southern forest zones. Immediate evacuation recommended.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa', 
  },
  alertBox: {
    backgroundColor: '#ff4d4d', 
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    color: '#ffffff',
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  alertText: {
    color: '#ffffff',
    fontSize: '1.2em',
    lineHeight: '1.5',
  },
};

export default EmergencyPage;