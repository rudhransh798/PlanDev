import { useState } from 'react';
import useBoardStore from '../../store/useBoardStore';
import './AddColumn.css'

const AddColumn = () => {

    const addColumn = useBoardStore((state) => state.addColumn);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedColor, setSelectedColor] = useState('todo');
    const colorOptions = ['todo', 'inprogress', 'inreview', 'done'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '') return;
        addColumn({ title, color: selectedColor, taskIds: [] });
        setTitle('');
        setIsEditing(false);
    }

    return (
        <div className="add-column">
            {isEditing ? (
                <div className="add-column__form-wrapper" >
                <form className="add-column__form" onSubmit={handleSubmit} >
                    <input
                        autoFocus
                        type="text"
                        placeholder="Column title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="add-column__colors">
                        {colorOptions.map((color) => (
                            <span
                                key={color}
                                className={`add-column__color-dot add-column__color-dot--${color} ${selectedColor === color ? 'selected' : ''}`}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>
                    <div className="add-column__actions">
                    <button type="submit" className="add-column__btn-submit">
                        Add Column
                    </button>
                    <button type="button" className="add-column__btn-cancel" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                    </div>
                </form>
                </div>
            ) : (
                <div className="add-column__trigger" onClick={() => setIsEditing(true)}>
                    + Add Column
                </div>
            )}
        </div>
    );

}

export default AddColumn;