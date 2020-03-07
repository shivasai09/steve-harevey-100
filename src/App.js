import React from "react";
import "./App.css";
import Timer from "./Timer";
import FlipCard from "./FlipCard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      flippedCards: [],
      temporaryFlipCards: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19
      ],
      isLoading: true,
      showCardOnlay: true
    };
    this.clearUnflipCardsTiemout = null;
  }
  componentDidMount = () => {
    this._reloadGame();
  };

  render() {
    const { cards, isLoading } = this.state;
    return (
      <>
        {!isLoading && <Timer />}
        <div className="cardContainer">
          {!!cards.length && !isLoading ? (
            <>
              {cards.map((item, index) => (
                <FlipCard
                  key={index}
                  imgUrl={item.url}
                  number={index}
                  flipTheCard={this.state.flippedCards.indexOf(index) !== -1}
                  onCardClick={this._onCardClick}
                  isFound={item.found}
                />
              ))}
              {this.state.showCardOnlay && (
                <div className={"cardContainerOnlay"}></div>
              )}
            </>
          ) : (
            "loading"
          )}
        </div>
      </>
    );
  }

  _reloadGame = () => {
    window
      .fetch(
        `https://pixabay.com/api/?key=13950983-0cc2df65cb77188cf1269f3fe&image_type=photo&category=food&page=${Math.floor(
          Math.random() * 10
        ) + 1}&per_page=10`
      )
      .then(res => res.json())
      .then(res => {
        let cards = [];
        res.hits.map(item => {
          cards.push({ url: item.previewURL, found: false });
        });
        cards = cards.concat(cards.slice(0));
        this._shuffle(cards);
        this.setState({ cards, isLoading: false, showCardOnlay: false }, () =>
          this._stopGame()
        );
      });
  };

  _stopGame = () => {
    const x = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19
    ];
    setTimeout(() => this.setState({ flippedCards: x }), 45000);
  };

  _unFlipCards = () => {
    let cards = [].concat(this.state.cards.slice(0));
    let flippedCards = [...this.state.flippedCards];
    if (
      flippedCards.length === 2 &&
      cards[flippedCards[0]].url === cards[flippedCards[1]].url
    ) {
      cards[flippedCards[0]].found = true;
      cards[flippedCards[1]].found = true;
      setTimeout(() => this.setState({ cards }), 700);
      return;
    }
    flippedCards.length === 2 &&
      (this.clearUnflipCardsTiemout = setTimeout(
        () => this.setState({ flippedCards: [], cards }),
        1000
      ));
  };
  _onCardClick = clickedCardId => {
    if (!!this.clearUnflipCardsTiemout) {
      clearTimeout(this.clearUnflipCardsTiemout);
    }
    let flippedCards =
      this.state.flippedCards.length === 2
        ? [clickedCardId]
        : [...this.state.flippedCards, clickedCardId];

    this.setState({ flippedCards }, () => this._unFlipCards());
  };

  //  Fisher-Yates shuffle
  _shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
}

export default App;
