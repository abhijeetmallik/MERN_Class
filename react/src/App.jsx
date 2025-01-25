import React from 'react'
import Timer from './components/Timer'
import WorkTimer from './components/WorkTimer'

const App = () => {
  return (
    <div className='flex justify-center items-center  w-[100%] border-[1px] border-[black] h-[100vh]'> 
      {/* <Timer /> */}
      <WorkTimer />
    </div>
  )
}

export default App
