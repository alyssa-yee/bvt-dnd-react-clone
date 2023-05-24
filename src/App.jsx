import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DragAndDropBox from './components/DragAndDropBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* Need to fix the base app styles so that things are proper 
    with no leaking margins*/}
    <div className='app-container'>

      <DragAndDropBox></DragAndDropBox>

    </div>
     
    </>
  )
}

export default App
