import React, { useState } from 'react';
import './polaroid.css';

function Polaroid(props) {
  return (
    <div class="wrapper">
      <div class="item">
        <div class="polaroid">
          {props.children}
          <div class="caption">{props.caption}</div>
        </div>
      </div>
    </div>
  );
}

export default Polaroid;
