// src/components/icons/MenuToggleIcon.jsx
import React from 'react';

const MenuToggleIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9V7.5C3.75 6.679 4.429 6 5.25 6h13.5C19.571 6 20.25 6.679 20.25 7.5V9M3.75 9l6.75 3 6.75-3M3.75 20.25v-1.5C3.75 18.321 4.429 17.65 5.25 17.65h13.5C19.571 17.65 20.25 18.321 20.25 19.15v1.5M3.75 20.25l6.75-3 6.75 3"
      />
    </svg>
  );
};

export default MenuToggleIcon;