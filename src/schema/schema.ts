import countryList from '../data/countries'

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

export default schema
