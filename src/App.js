import React, {useState} from "react";
import Sidebar from "./Sidebar";
import MainContentArea from "./ContentArea";

function App() {
    const [projects, setProjects] = useState([]);
    const [isActive, setIsActive] = useState("Inbox");

    return (
      <>
        <Sidebar projects={projects} setProjects={setProjects} isActive={isActive} setIsActive={setIsActive}/>
        <MainContentArea projects={projects} setProjects={setProjects} isActive={isActive} setIsActive={setIsActive}/>
      </>
    );
}
  
export default App;