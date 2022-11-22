
import React from 'react'

import AddItem from "./components/add.item";
import EditItem from "./components/edit.item";
import Home from "./components/home";
import NavBar from "./components/nav.bar";

function App() {
  let component
  switch (window.location.pathname) {
    case '/':
      component = <Home />
      break
    case '/add':
      component = <AddItem />
      break
    case '/edit':
      component = <EditItem />
      break
    default:
      component = <Home />
  }
  
  
  return(
    <>
    <NavBar />
    {component}
        </>
  )
 
};

export default App;