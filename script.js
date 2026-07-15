const button = document.querySelector('.cushion-button');

// Track mouse position for dynamic deformation
let mouseX = 0;
let mouseY = 0;
let isHovering = false;
let isPressed = false;

// Get button center for calculating deformation based on cursor position
function getButtonCenter() {
  const rect = button.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    width: rect.width,
    height: rect.height
  };
}

// Calculate deformation based on mouse position relative to button center
function calculateDeformation(clientX, clientY) {
  const center = getButtonCenter();
  const deltaX = (clientX - center.x) / (center.width / 2);
  const deltaY = (clientY - center.y) / (center.height / 2);
  
  // Clamp values between -1 and 1
  const clampedDeltaX = Math.max(-1, Math.min(1, deltaX));
  const clampedDeltaY = Math.max(-1, Math.min(1, deltaY));
  
  return {
    rotateY: clampedDeltaX * 15, // Rotate around Y axis based on X position
    rotateX: -clampedDeltaY * 15, // Rotate around X axis based on Y position
    skewX: clampedDeltaY * 5,
    skewY: clampedDeltaX * 5
  };
}

// Mouse enter - start hovering
button.addEventListener('mouseenter', (e) => {
  isHovering = true;
  mouseX = e.clientX;
  mouseY = e.clientY;
  button.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  
  const deformation = calculateDeformation(mouseX, mouseY);
  applyTransform(deformation, 0.97, false);
});

// Mouse move - update deformation based on position
button.addEventListener('mousemove', (e) => {
  if (!isHovering || isPressed) return;
  
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  const deformation = calculateDeformation(mouseX, mouseY);
  applyTransform(deformation, 0.97, false);
});

// Mouse leave - return to normal
button.addEventListener('mouseleave', () => {
  isHovering = false;
  button.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  button.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg)';
  button.style.boxShadow = `
    0 15px 35px rgba(0, 0, 0, 0.4),
    0 5px 15px rgba(0, 0, 0, 0.3),
    inset 0 -8px 20px rgba(0, 0, 0, 0.4),
    inset 0 8px 20px rgba(255, 255, 255, 0.3),
    inset 0 0 60px rgba(255, 100, 150, 0.2)
  `;
});

// Mouse down - press/click effect (deeper compression)
button.addEventListener('mousedown', (e) => {
  isPressed = true;
  mouseX = e.clientX;
  mouseY = e.clientY;
  button.style.transition = 'transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  
  const deformation = calculateDeformation(mouseX, mouseY);
  applyTransform(deformation, 0.92, true);
});

// Mouse up - release
button.addEventListener('mouseup', () => {
  isPressed = false;
  
  if (isHovering) {
    button.style.transition = 'transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    const deformation = calculateDeformation(mouseX, mouseY);
    applyTransform(deformation, 0.97, false);
  } else {
    button.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    button.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg)';
  }
  
  button.style.boxShadow = `
    0 15px 35px rgba(0, 0, 0, 0.4),
    0 5px 15px rgba(0, 0, 0, 0.3),
    inset 0 -8px 20px rgba(0, 0, 0, 0.4),
    inset 0 8px 20px rgba(255, 255, 255, 0.3),
    inset 0 0 60px rgba(255, 100, 150, 0.2)
  `;
});

// Helper function to apply transform with scale and shadow
function applyTransform(deformation, scale, isPressed) {
  const { rotateX, rotateY, skewX, skewY } = deformation;
  
  button.style.transform = `
    scale(${scale}) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    skewX(${skewX}deg) 
    skewY(${skewY}deg)
  `;
  
  if (isPressed) {
    button.style.boxShadow = `
      0 5px 15px rgba(0, 0, 0, 0.3),
      0 2px 5px rgba(0, 0, 0, 0.2),
      inset 0 -3px 10px rgba(0, 0, 0, 0.3),
      inset 0 3px 10px rgba(255, 255, 255, 0.2),
      inset 0 0 40px rgba(255, 100, 150, 0.4)
    `;
  } else {
    button.style.boxShadow = `
      0 10px 25px rgba(0, 0, 0, 0.35),
      0 3px 10px rgba(0, 0, 0, 0.25),
      inset 0 -5px 15px rgba(0, 0, 0, 0.35),
      inset 0 5px 15px rgba(255, 255, 255, 0.25),
      inset 0 0 50px rgba(255, 100, 150, 0.3)
    `;
  }
}

// Add touch support for mobile devices
button.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  isPressed = true;
  mouseX = touch.clientX;
  mouseY = touch.clientY;
  button.style.transition = 'transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  
  const deformation = calculateDeformation(mouseX, mouseY);
  applyTransform(deformation, 0.92, true);
}, { passive: false });

button.addEventListener('touchend', () => {
  isPressed = false;
  button.style.transition = 'transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  button.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg)';
  button.style.boxShadow = `
    0 15px 35px rgba(0, 0, 0, 0.4),
    0 5px 15px rgba(0, 0, 0, 0.3),
    inset 0 -8px 20px rgba(0, 0, 0, 0.4),
    inset 0 8px 20px rgba(255, 255, 255, 0.3),
    inset 0 0 60px rgba(255, 100, 150, 0.2)
  `;
});
