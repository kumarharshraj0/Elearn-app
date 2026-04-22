// src/components/BrandLogo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ size = "normal", showText = true, light = false }) {
  const width = size === "small" ? "150" : size === "large" ? "300" : "200";
  const height = size === "small" ? "45" : size === "large" ? "90" : "60";
  const fontSize = "32";

  return (
    <Link to="/" className="flex items-center group">
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 250 70" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="transform group-hover:scale-105 transition-transform duration-300"
      >
        <g id="logo-icon">
          <path d="M15 45L35 55L55 45L35 35L15 45Z" fill="#4F46E5" fillOpacity="0.6"/>
          <path d="M15 35L35 45L55 35L35 25L15 35Z" fill="#6366F1" fillOpacity="0.8"/>
          <path d="M15 25L35 35L42 31.5L42 20L35 15L15 25Z" fill="#818CF8"/>
          <path d="M42 22L58 10M58 10H48M58 10V20" stroke={light ? "#34D399" : "#10B981"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        {showText && (
          <text 
            x="70" 
            y="45" 
            fontFamily="Arial, sans-serif" 
            fontWeight="bold" 
            fontSize={fontSize} 
            fill={light ? "#FFFFFF" : "#1F2937"}
          >
            Stack<tspan fill="#6366F1">Path</tspan>
          </text>
        )}
      </svg>
    </Link>
  );
}
