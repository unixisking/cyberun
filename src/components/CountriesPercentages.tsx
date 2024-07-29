import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import { Button } from '@mui/material'
import schema from '../schema/schema'
import uischema from '../schema/uischema'
import PercentageControl from './Percentage/PercentageControl'
import percentageTester from './Percentage/percentageTester'
import styled from '@emotion/styled'
import { ErrorObject } from 'ajv'
import { useState, useEffect } from 'react'

const StyledGroup = styled.div`
  background-color: #f0f0f0; // Set your desired background color here
  padding: 20px;
  border-radius: 8px;
`
const initialData = {
  name: 'Percentages of X by country',
  countries: [
    {
      country: 'France',
      percentage: 50,
    },
    {
      country: 'Belgium',
      percentage: 20,
    },
    {
      country: 'Germany',
      percentage: 10,
    },
    {
      country: 'Inconnu',
      percentage: 20,
    },
  ],
}

export default function CountriesPercentages() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('data')
    return savedData ? JSON.parse(savedData) : initialData
  })
  const [percentageError, setPercentageError] = useState<ErrorObject[]>([])

  useEffect(() => {
    let total = 0
    for (const country of data.countries) {
      total += country.percentage
    }
    if (total !== 100) {
      setPercentageError(() => [
        {
          instancePath: '/countries',
          message: 'Total percentage of all countries should equal to 100',
          keyword: '',
          schemaPath: '',
          params: {},
        },
      ])
    } else {
      setPercentageError([])
    }
  }, [data])
  return (
    <>
      <StyledGroup id="hello">
        <JsonForms
          renderers={[
            ...materialRenderers,
            { tester: percentageTester, renderer: PercentageControl },
          ]}
          cells={[...materialCells]}
          schema={schema}
          uischema={uischema}
          data={data}
          onChange={({ data }) => {
            setData(data)
          }}
          additionalErrors={percentageError}
        />
      </StyledGroup>
      <Button
        sx={{ marginTop: '10px' }}
        variant="contained"
        onClick={() =>
          window.localStorage.setItem('data', JSON.stringify(data))
        }
      >
        Save
      </Button>
    </>
  )
}
