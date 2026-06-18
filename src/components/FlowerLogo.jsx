import React from 'react';

function FlowerLogo({ dark = false, large = false }) {
  return (
    <div className={`flower-logo ${dark ? 'dark' : ''} ${large ? 'large' : ''}`} aria-label="구현모 로고">
      <span></span><span></span><span></span><span></span><span></span>
      <b>H</b>
    </div>
  );
}

export default FlowerLogo;
