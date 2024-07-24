import { Button } from "reactstrap"

function ToDoButtons(props){
    const {clearAll, checkAll, clearChecked} = props
    return (
        <div style={{width: "100%",display:"flex", justifyContent: "space-around"}}>
            <Button onClick={checkAll}>Check All</Button> 
            <Button onClick={clearAll}>Clear All</Button>
            <Button onClick={clearChecked}>Clear Checked</Button>
        </div>
    )
}

export default ToDoButtons;