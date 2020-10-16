import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EntityTypes, PrimitiveTypes } from 'types/filters'
import { RootState } from 'core/redux/reducers'
import { get as getFilters } from 'core/redux/reducers/filters'
import { get as getPlaylists } from 'core/redux/reducers/spotify'
import { formatISO, isDate } from 'date-fns'

const TextField = React.lazy(() => import('@material-ui/core/TextField'))
const Select = React.lazy(() => import('app/components/Select'))

export default () => {
  const dispatch = useDispatch()
  const { items } = useSelector(({ filters }: RootState) => filters)
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFilterValues(prevState => {
      let newState = { ...prevState, [name]: value }
      if (!value) {
        delete newState[name]
      }
      return newState
    })
  }, [])

  const handleChangeDateTimeField = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? new Date(event.target.value) : null
    const date = isDate(value) ? formatISO(value as Date) : ''
    handleChange({
      ...event,
      target: {
        ...event.target,
        name: event.target.name,
        value: date
      }
    })
  }, [handleChange])

  useEffect(() => {
    dispatch(getFilters())
  }, [dispatch])

  useEffect(() => {
    const timeToRefreshSearch = 30000

    dispatch(getPlaylists(filterValues))

    const timeout = setTimeout(() => {
      dispatch(getPlaylists(filterValues))
    }, timeToRefreshSearch)

    return () => {
      clearTimeout(timeout)
    }
  }, [dispatch, filterValues])

  const fields = useMemo(
    () => items.map(({ id, name, values, validation }) => {
      if (validation) {
        if (validation.primitiveType === PrimitiveTypes.INTEGER) {
          return <TextField
            fullWidth
            label={name}
            name={id}
            type="number"
            inputProps={{
              max: validation.max,
              min: validation.min || 0
            }}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
        } else if (validation.primitiveType === PrimitiveTypes.STRING && validation.entityType === EntityTypes.DATE_TIME) {
          return <TextField
            fullWidth
            name={id}
            label={name}
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            onChange={handleChangeDateTimeField}
          />
        }
      } else if (values) {
        return <Select
          value={filterValues[id]}
          options={values}
          name={id}
          label={name}
          emptyOption
          onChange={handleChange}
        />
      }

      return <TextField name={id} label={name} InputLabelProps={{ shrink: true }} />
    }),
    [filterValues, handleChange, handleChangeDateTimeField, items]
  )

  return fields
}