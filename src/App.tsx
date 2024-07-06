import StepsWidget from './components/StepsWidget';
import './main.scss'
import { WalkingPeriod } from './types/WalkingPeriod';

function App() {
  const data: WalkingPeriod[] = JSON.parse(localStorage.getItem("steps_data") ?? "[]");

  return (
    <>
      <div className='wrapper'>
        <StepsWidget data={data} />
      </div>
    </>
  )
}

export default App
