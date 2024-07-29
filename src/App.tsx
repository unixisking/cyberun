import './App.css'
import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { useEffect, useState } from 'react'
import countryList from './data/countries'
import styled from '@emotion/styled'
import { ErrorObject } from 'ajv'
import { Button } from '@mui/material'
import percentageTester from './components/Percentage/percentageTester'
import PercentageControl from './components/Percentage/PercentageControl'

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    countries: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          country: {
            type: 'string',
            enum: countryList,
          },
          percentage: {
            type: 'number',
            minimum: 0,
            maximum: 100,
          },
        },
        required: ['country', 'percentage'],
      },
    },
  },
  required: ['name'],
}

const uischema = {
  type: 'Group',
  label: 'Cyberun',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/name',
    },
    {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/countries',
          options: {
            detail: {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/country',
                  options: {
                    autocomplete: true,
                  },
                },
                {
                  type: 'Control',
                  scope: '#/properties/percentage',
                },
              ],
            },
          },
        },
      ],
    },
  ],
}

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

const AppContainer = styled.div`
  padding: 20px;
`

const StyledGroup = styled.div`
  background-color: #f0f0f0; // Set your desired background color here
  padding: 20px;
  border-radius: 8px;
`

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('data')
    return savedData ? JSON.parse(savedData) : initialData
  })
  const [percentageError, setPercentageError] = useState<ErrorObject[]>([])

  useEffect(() => {
    console.log('data changed', data)
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
    <AppContainer className="App">
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
            console.log('data changed', data)
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
    </AppContainer>
  )
}

export default App
