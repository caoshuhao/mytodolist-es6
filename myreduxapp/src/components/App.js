import React from 'react'
import Done from './Done.js'
import Button from './Button'
import OnGoing from './Ongoing.js'
import TodoTop from './Todotop'
const App=()=>(
    
    <div className="todobox">
        <TodoTop/>
        <Button/>
        <OnGoing/>
        <Done/>
    </div>
    
)
export default App

