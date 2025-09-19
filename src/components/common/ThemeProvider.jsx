import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { setTheme } from '../../store/slices/uiSlice'

export default function ThemeProvider({ children }) {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.ui.theme)

  useEffect(() => {
    // Apply theme on initial load
    document.documentElement.classList.toggle('dark', theme === 'dark')

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = e => {
      if (!localStorage.getItem('theme')) {
        dispatch(setTheme(e.matches ? 'dark' : 'light'))
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [dispatch, theme])

  return <>{children}</>
}
