import {useState} from "react";

export default function Square(props) {
    const [value, setValue] = useState(null);

    function isSquareOccupied() {
        if (value !== null) {
            return true;
        } else {
            return false;
        }
    }

    function handleClick() {
        if (isSquareOccupied()) return;
        const [gameState, STATUS] = props.index;
        if (gameState !== STATUS.NOTFINISHED) return;
        setValue(props.value);
        props.onClick();
    }

    return (
        <>
          <button className="square" onClick={handleClick}>
              {value}
          </button>
        </>
    )
}