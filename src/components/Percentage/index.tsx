import React, { ChangeEventHandler } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import PercentIcon from '@mui/icons-material/Percent'
import styled from '@emotion/styled'

/**
 * This styling is used to remove the two chevrons that come
 * by default in the input, this is totally optional.
 */
const StyledTextField = styled(TextField)({
  // Hide spin buttons (chevrons) for WebKit browsers
  width: '100%',
  '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  // Hide spin buttons (chevrons) for Firefox
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
})

interface IPercentageInputProps {
  value: number
  onChange: ChangeEventHandler<HTMLInputElement>
  label: string
}

const PercentageInput = ({ value, onChange, label }: IPercentageInputProps) => {
  return (
    <StyledTextField
      label={label}
      value={value}
      type="number"
      inputProps={{ min: 0, max: 100 }}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PercentIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PercentageInput
