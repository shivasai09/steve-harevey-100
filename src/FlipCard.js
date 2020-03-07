import * as React from "react";
import "./FlipCard.scss";

function FlipCard(props) {
  const {
    number,
    imgUrl,
    onCardClick,
    flipTheCard,
    isFound,
    rollTheCard
  } = props;
  const _onButtonClick = ev => {
    !flipTheCard && onCardClick(number);
  };
  return (
    <>
      {!isFound && (
        <button
          className={`card ${flipTheCard && "flip-card"} ${rollTheCard &&
            "keep-rotating-card"}`}
          onClick={_onButtonClick}
        >
          <div className="face front-face">{number + 1}</div>
          <div className="face back-face">
            <img src={imgUrl} className="img" />
          </div>
        </button>
      )}
      {isFound && (
        <div className={"card card-border"}>
          <div className={"center star"}> {"⭐"}</div>
        </div>
      )}
    </>
  );
}

export default React.memo(FlipCard);
