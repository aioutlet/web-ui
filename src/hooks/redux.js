import { useSelector, useDispatch } from 'react-redux'

/**
 * Custom hook to use Redux store with TypeScript-like safety
 */
export const useAppSelector = useSelector
export const useAppDispatch = () => useDispatch()
