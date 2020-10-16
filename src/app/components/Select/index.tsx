import React, { ChangeEvent, memo } from 'react'
import { FormControl, InputLabel, makeStyles, MenuItem, Select as MuiSelect } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
}))

type Props = {
  label: string,
  name: string,
  value?: string | number,
  emptyOption?: boolean,
  options: { value: string, name: string }[],
  onChange: (event: ChangeEvent<any>) => void
}

const Select = ({
  label,
  name,
  value,
  emptyOption = false,
  options = [],
  onChange
}: Props) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel id={`select-label-${name}`} shrink>
        {label}
      </InputLabel>
      <MuiSelect
        labelWidth={24}
        labelId={`select-label-${name}`}
        value={value ? value : " "}
        inputProps={{
          name,
        }}
        label={label}
        onChange={onChange}
      >
        {emptyOption && <MenuItem value="" />}
        {options.map(option => (
          <MenuItem
            value={option.value}
            key={option.value}
          >
            {option.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default memo(Select)