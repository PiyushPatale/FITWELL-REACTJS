import React from 'react';

function Alert(props) {
  const Capitalize = (msg) => {
    let str = msg.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div style={{ position: 'fixed', top: '70px', right: '10px', zIndex: 100009 }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type !== 'success' ? 'danger' : props.alert.type} alert-dismissible fade show`}
          role="alert"
          style={{width: '400px' }}
        >
          <strong>{Capitalize(props.alert.type)}</strong>: {props.alert.msg}.
        </div>
      )}
    </div>
  );
}

export default Alert;
