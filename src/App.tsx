import StepsWidget from './components/StepsWidget';
import './main.scss'
import { WalkingPeriod } from './types/WalkingPeriod';
import { data as dummy } from './data/dummydata';

function App() {
  const data: WalkingPeriod[] = JSON.parse(localStorage.getItem("steps_data") ?? "[]");
  if (data.length === 0) {
    dummy.map(p => data.push(p));
    localStorage.setItem('steps_data', JSON.stringify(data));
  }

  return (
    <>
      <div className='wrapper'>
        <StepsWidget data={data} />
      </div>
    </>
  )
}

export default App
