import { ChangeEvent } from 'react'
import PercentageInput from '.'
import { withJsonFormsControlProps } from '@jsonforms/react'

interface IPercentageControlProps {
  data: number
  handleChange(path: string, value: number): void
  path: string
}

const PercentageControl = ({
  data,
  handleChange,
  path,
}: IPercentageControlProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)
    if (value >= 0 && value <= 100) {
      handleChange(path, parseInt(e.currentTarget.value))
    }
  }
  return <PercentageInput label="Percentage" value={data} onChange={onChange} />
}

export default withJsonFormsControlProps(PercentageControl)
