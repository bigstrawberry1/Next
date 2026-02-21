
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: number; // 0 to 100
  createdAt: number;
}

/**
 * Returns a soft, pastel color hex based on priority (0-100).
 * 0 is soft green, 50 is soft yellow, 100 is soft red.
 */
export const getPriorityColor = (value: number) => {
  // Brighter Morandi Palette Interpolation
  // Low (0): Fresh Sage (#A4D6C4) -> rgb(164, 214, 196)
  // Mid (50): Warm Sand (#EEE0C6) -> rgb(238, 224, 198)
  // High (100): Soft Coral (#E0A8A8) -> rgb(224, 168, 168)
  
  if (value < 50) {
    // Sage to Sand
    const ratio = value / 50;
    const r = Math.round(164 + (238 - 164) * ratio);
    const g = Math.round(214 + (224 - 214) * ratio);
    const b = Math.round(196 + (198 - 196) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Sand to Coral
    const ratio = (value - 50) / 50;
    const r = Math.round(238 + (224 - 238) * ratio);
    const g = Math.round(224 + (168 - 224) * ratio);
    const b = Math.round(198 + (168 - 198) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  }
};

// Also return a darker version for text/borders if needed
export const getPriorityBorderColor = (value: number) => {
  // Brighter/More Saturated Accents
  if (value < 50) return '#6FB398'; // Brighter Sage
  if (value < 80) return '#D4B483'; // Golden Sand
  return '#D68585'; // Coral Red
};
