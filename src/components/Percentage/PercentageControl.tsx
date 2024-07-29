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
}: IPercentageControlProps) => (
  <PercentageInput
    label="Percentage"
    value={data}
    onChange={(e) => handleChange(path, parseInt(e.currentTarget.value))}
  />
)

export default withJsonFormsControlProps(PercentageControl)
