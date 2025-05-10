import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext()

const ThemeContext = ({children}) =>{
  const [isDarkMode, setIsDarkMode] = useState(false)
  
   
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    setIsDarkMode(true);
    document.documentElement.classList.add('dark');
  } else {
    setIsDarkMode(false);
    document.documentElement.classList.remove('dark');
  }
}, []);

const toggleTheme = () => {
  setIsDarkMode(prev => {
    const newTheme = !prev ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return !prev;
  });
};


  return(
    <themeContext.Provider value={{isDarkMode, toggleTheme}}>
      {children}
    </themeContext.Provider>
  )
}
export const useTheme = () => useContext(themeContext)
export default ThemeContext