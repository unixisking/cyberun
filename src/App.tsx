import './App.css'

import styled from '@emotion/styled'

import CountriesPercentages from './components/CountriesPercentages'

const AppContainer = styled.div`
  padding: 20px;
`

function App() {
  return (
    <AppContainer className="App">
      <CountriesPercentages />
    </AppContainer>
  )
}

export default App
