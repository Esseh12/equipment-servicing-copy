// github.com/n3r4zzurr0/svg-spinners
import React from 'react';

interface RingLoadingProps {
  size?: number;
  color?: string;
  bgOpacity?: number;
  className?: string;
}

function RingLoading({ 
  size = 24, 
  color = "#fff",
  bgOpacity = 0.25,
  className = ""
}: RingLoadingProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity={bgOpacity}
        fill={color}
      />
      <path 
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
        fill={color}
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.75s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

export default RingLoading;

// Usage examples:
// <RingLoading /> // Default blue
// <RingLoading color="#10B981" /> // Green
// <RingLoading color="#EF4444" /> // Red
// <RingLoading color="#6B7280" /> // Gray
// <RingLoading color="#8B5CF6" /> // Purple
// <RingLoading size={32} color="#F59E0B" /> // Larger orange spinner
// <RingLoading color="#000000" bgOpacity={0.1} /> // Black with lighter background