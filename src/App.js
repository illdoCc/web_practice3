import React, {useState} from "react";
import MySidebar from "./Sidebar";
import NewProjectBtn from "./NewProjectBtn";

function App() {
    const [projects, setProjects] = useState([]);

    return (
      <div className="app">
          <MySidebar/>
          <NewProjectBtn/>
      </div>
    );
}
  
export default App;