import React from "react";

function Project({id_num, project_name}){
    return(
        <>
        <div id={"project" + id_num} className="project active">
            <span id={project_name} className="project_name">
                {project_name}
            </span>
        </div>
        <button className="delete_btn">
            🗑️
        </button>
        </>
    );
}

export default function ProjectBtn(){
    return(
        <Project />
    );
}