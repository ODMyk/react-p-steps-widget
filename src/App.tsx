import StepsWidget from './components/StepsWidget';
import './main.scss'
import { WalkingPeriod } from './types/WalkingPeriod';

function App() {
  const data: WalkingPeriod[] = [
    {
      "startTime": "2024-07-06T00:16:54.000Z",
      "endTime": "2024-07-06T00:57:54.000Z",
      "steps": 181
    },
    {
      "startTime": "2024-07-06T01:00:14.000Z",
      "endTime": "2024-07-06T01:12:14.000Z",
      "steps": 54
    },
    {
      "startTime": "2024-07-06T01:14:10.000Z",
      "endTime": "2024-07-06T01:39:10.000Z",
      "steps": 426
    },
    {
      "startTime": "2024-07-06T02:17:41.000Z",
      "endTime": "2024-07-06T02:49:41.000Z",
      "steps": 246
    },
    {
      "startTime": "2024-07-06T02:52:24.000Z",
      "endTime": "2024-07-06T03:19:24.000Z",
      "steps": 464
    },
    {
      "startTime": "2024-07-06T03:59:40.000Z",
      "endTime": "2024-07-06T05:06:40.000Z",
      "steps": 492
    },
    {
      "startTime": "2024-07-06T06:32:16.000Z",
      "endTime": "2024-07-06T06:38:16.000Z",
      "steps": 181
    },
    {
      "startTime": "2024-07-06T07:14:19.000Z",
      "endTime": "2024-07-06T08:09:19.000Z",
      "steps": 218
    },
    {
      "startTime": "2024-07-06T09:49:37.000Z",
      "endTime": "2024-07-06T10:27:37.000Z",
      "steps": 343
    },
    {
      "startTime": "2024-07-06T10:30:37.000Z",
      "endTime": "2024-07-06T10:59:58.000Z",
      "steps": 400
    },
    {
      "startTime": "2024-07-06T11:01:25.000Z",
      "endTime": "2024-07-06T11:57:25.000Z",
      "steps": 329
    },
    {
      "startTime": "2024-07-06T12:06:50.000Z",
      "endTime": "2024-07-06T12:53:50.000Z",
      "steps": 208
    },
    {
      "startTime": "2024-07-06T13:25:01.000Z",
      "endTime": "2024-07-06T14:03:01.000Z",
      "steps": 275
    },
    {
      "startTime": "2024-07-06T14:15:38.000Z",
      "endTime": "2024-07-06T14:42:38.000Z",
      "steps": 381
    },
    {
      "startTime": "2024-07-06T14:53:01.000Z",
      "endTime": "2024-07-06T15:36:01.000Z",
      "steps": 113
    },
  ];

  return (
    <>
      <div className='wrapper'>
        <StepsWidget data={data} />
      </div>
    </>
  )
}

export default App
