
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
  // Simple interpolation between Green (#D1FAE5), Yellow (#FEF3C7), and Red (#FFE4E6)
  // These are Tailwind's 100-weight colors for emerald, amber, and rose.
  
  if (value < 50) {
    // Green to Yellow
    const ratio = value / 50;
    const r = Math.round(209 + (254 - 209) * ratio);
    const g = Math.round(250 + (243 - 250) * ratio);
    const b = Math.round(229 + (199 - 229) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Yellow to Red
    const ratio = (value - 50) / 50;
    const r = Math.round(254 + (255 - 254) * ratio);
    const g = Math.round(243 + (228 - 243) * ratio);
    const b = Math.round(199 + (230 - 199) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  }
};

// Also return a darker version for text/borders if needed
export const getPriorityBorderColor = (value: number) => {
  if (value < 50) return '#10b981'; // emerald-500
  if (value < 80) return '#f59e0b'; // amber-500
  return '#f43f5e'; // rose-500
};
