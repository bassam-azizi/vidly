import React from "react";

const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onGenreSelected,
    selectedItem
  } = props;

  return (
    <ul className="list-group">
      {/* <li className="list-group-item">AllMovies</li> */}
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onGenreSelected(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          style={{ cursor: "pointer" }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
