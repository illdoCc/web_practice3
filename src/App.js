import React, {useState} from "react";
import Sidebar from "./Sidebar";
import MainContentArea from "./ContentArea";

function App() {
    const [projects, setProjects] = useState([]);
    const [isActive, setIsActive] = useState("Inbox");


    const isFirstRender = React.useRef(true);
    // load from local, 
    React.useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }
        const storedProjects = localStorage.getItem("projectList");
        if(!storedProjects) return;

        const projectList = JSON.parse(storedProjects);
        // console.log(projectList);
        projectList.forEach(project => {
            const projectName = project.id;
            // console.log(projectName);
            if(projectName !== "Inbox"){
              setProjects(prevProjects => [...prevProjects, projectName]);
            }
        });
        // console.log(projects);
    }, []);

    React.useEffect(() => {
      console.log(projects);
    }, [projects]);

    return (
      <>
        <Sidebar projects={projects} setProjects={setProjects} isActive={isActive} setIsActive={setIsActive}/>
        <MainContentArea projects={projects} setProjects={setProjects} isActive={isActive} setIsActive={setIsActive}/>
      </>
    );
}
  
export default App;