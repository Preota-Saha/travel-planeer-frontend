import { useState } from 'react';

const THEMES = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'];

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('dark');

  const changeTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    setCurrentTheme(theme);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        <span className="text-theme-base-content">🎨 Theme</span>
      </div>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-theme-base-100 rounded-box w-52 max-h-96 overflow-y-auto">
        {THEMES.map((theme) => (
          <li key={theme}>
            <button 
              onClick={() => changeTheme(theme)}
              className={`${currentTheme === theme ? 'active' : ''}`}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeSwitcher;