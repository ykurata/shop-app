import React from 'react';

const Loading = () => {
  return (
    <div className="text-center mt-5">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>  
  );
}

export default Loading;
