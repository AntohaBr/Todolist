import { useDispatch } from "react-redux"
import { ActionCreatorsMapObject, bindActionCreators } from "redux"
import { useMemo } from "react"
import { AppDispatch } from "app/store"

export const useAppDispatch = () => useDispatch<AppDispatch>()

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch()

  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [])

  return boundActions
}
