const button = document.querySelector('.cushion-button');

// Add hover effect with smooth transitions
button.addEventListener('mouseenter', () => {
  button.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
});

button.addEventListener('mouseleave', () => {
  button.style.transition = 'transform 0.3s ease-in, box-shadow 0.3s ease-in';
});

// Add active state for click
button.addEventListener('mousedown', () => {
  button.style.transform = 'scale(0.9) translateY(6px)';
  button.style.boxShadow = `
    0 2px 5px rgba(0, 0, 0, 0.1), 
    inset 0 -1px 4px rgba(0, 0, 0, 0.1), 
    inset 0 1px 4px rgba(255, 255, 255, 0.2)
  `;
});

button.addEventListener('mouseup', () => {
  button.style.transform = 'scale(1) translateY(0)';
  button.style.boxShadow = `
    0 8px 15px rgba(0, 0, 0, 0.2), 
    inset 0 -4px 8px rgba(0, 0, 0, 0.1), 
    inset 0 4px 8px rgba(255, 255, 255, 0.2)
  `;
});
