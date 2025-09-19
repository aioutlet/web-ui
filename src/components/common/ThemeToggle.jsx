import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { toggleTheme } from '../../store/slices/uiSlice'

export default function ThemeToggle({ className = '' }) {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.ui.theme)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <SunIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}
