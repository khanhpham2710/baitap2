import { useState } from "react";

function Name(props) {
    const { list , rename } = props;

    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(list.name); 

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    return (
        <div className="name">
            {isEdit ? (
                <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    onBlur={()=>{
                        rename(list.id, name)
                        setIsEdit(false)
                    }}
                />
            ) : (
                <p style={{ textDecorationLine: list.checked ? "line-through" : "none" }} onDoubleClick={()=>{
                    toggleEdit()
                }}>
                    {list.name} 
                </p>
            )}
        </div>
    );
}

export default Name;
