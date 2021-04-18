import { Container, Row } from 'react-bootstrap'
import './App.css';
import ScheduleList from './components/ScheduleList'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  console.log('hello from app')
  return (
    <div className="App">
      
      <Provider store={store}>
        <Container className="App">
          <Row>
            <ScheduleList />
          </Row>
        </Container>
      </Provider>
    </div>
  );
}

export default App;
