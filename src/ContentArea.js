import React, {useState, useRef} from "react";

// 試試新寫法: 不用project page，直接將tasks寫在contentArea上，切換project的時候，contentArea也隨即刷新
function ContentArea({projects = [], setProjects, isActive, setIsActive}){
    const [isOpen, setIsOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskPriority, setTaskPriority] = useState("1");
    // const [isCheck, setIsCheck] = useState(false);
    const [tasks, setTasks] = useState({}); // 儲存 {projectName: [[task1_name, descrip, date, pri], [task2_name, descrip, date, pri]]}
    const [bored, setBored] = useState(false);
    const dialogRef = useRef(null);
    const priorityIcon = {"1": "🔴 ", "2": "🟠 ", "3": "🟡 ", "4": "🟢 "};

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setTaskName("");
        setTaskDescription("");
        setTaskDate("");
        setTaskPriority("1");
        // setIsCheck(false);
        setIsOpen(false);
    };

    React.useEffect(() => {
        if(isOpen){
            dialogRef.current.showModal();
        }else{
            dialogRef.current.close();
        }

        if(bored && taskName !== "" && taskPriority !== "1"){
            handleSubmit();
            setBored(false);
        }
    }, [isOpen, bored, taskName, taskPriority]);

    const handleSubmit = () => {
        // 在active的project中插入tasks
        const projectName = isActive;
        setTasks(prevTasks => ({
            ...prevTasks,
            [projectName] : [...(prevTasks[projectName] || []), [taskName, taskDescription, taskDate, taskPriority, false]] 
        }));
        closeModal();
    }

    const check = (projectName, taskName) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [projectName] : prevTasks[projectName].map(task => 
                task[0] === taskName 
                    ? [task[0], task[1], task[2], task[3], !task[4]] // 切換checked
                    : task
            )
        }))
    }
    
    const deleteTask = (projectName, taskName) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [projectName] : prevTasks[projectName]?.filter(task => task[0] !== taskName) || []
        }))
    }

    const boredApi = async () => {
        const res = await fetch("https://bored.api.lewagon.com/api/activity");
        const resJson = await res.json();
        setBored(true);
        setTaskName(resJson.activity);
        setTaskPriority("4");
    }

    return(
        <div id="contentArea" className="contentArea">
            {tasks[isActive]?.map(([name, description, date, priority, checked], index) => (
                <div key={index} className="task">
                    <div className="task-header">
                        <input
                            type="checkbox"
                            className="check_box"
                            checked={checked}
                            onChange={() => check(isActive, name)}
                        />
                        <label className="task_label">
                            {priorityIcon[priority] + name}
                        </label>
                        <button className="delete_task_btn" onClick={() => deleteTask(isActive, name)}>
                            🗑️
                        </button>
                        <p className="description">
                            {description + date}
                        </p>
                    </div>
                    
                </div>
            ))}
            <button onClick={openModal} id="new_task" className="newTaskbtn">
            {/* <button id="new_task" className="newTaskbtn"> */}
                New Task
            </button>
            <button onClick={boredApi} id="bored" className="bored">
                Bored
            </button>
            <dialog ref={dialogRef} id="new_task_dialog">
                Task Name<br />
                <input 
                    type="text" 
                    id="task_name_box" 
                    className="new_task_input"
                    name="task_name_box" 
                    placeholder="Task" 
                    size="10" 
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                Description<br />
                <input 
                    type="text" 
                    id="description_box" 
                    className="new_task_input" 
                    name="description_box" 
                    placeholder="Description" 
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
                Due Date<br />
                <input 
                    type="date" 
                    id="date_box" 
                    className="new_task_input" 
                    name="date_box"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                />
                Priority(1 is most important)<br />
                <input 
                    type="number" 
                    id="priority" 
                    className="new_task_input"  
                    name="priority" 
                    min="1" 
                    max="4"
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                />
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleSubmit} id="task_submit_btn">Submit</button>
            </dialog>
        </div>
    );
}

export default function MainContentArea({projects, setProjects, isActive, setIsActive}){
    return(
        <ContentArea projects={projects} setProjects={setProjects} isActive={isActive} setIsActive={setIsActive}/>
    )
}