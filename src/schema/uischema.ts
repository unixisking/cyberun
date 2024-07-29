const uischema = {
  type: 'Group',
  label: 'Cyberun',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/name',
    },
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
}

export default uischema
