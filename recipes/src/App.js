import { BrowserRouter, Routes, Route, Switch, redirect } from "react-router-dom"
import Auth from "./components/Auth"
import Recipes from "./components/recipes.js"
import 'bootstrap/dist/css/bootstrap.min.css'





function App(){

  return (
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/recipes" element={<Recipes />}/>
        </Routes>
      </BrowserRouter>  
    
  )
}

export default App;
