import React, { Component } from "react";
import styled from "styled-components";

const H1 = styled.h1`
  text-align: center;
  font-size: 40px;
  margin-bottom: 0;
  margin-top: 10px;
`;

const H4 = styled.h4`
  text-align: center;
  color: gray;
  margin: 0;
  margin-bottom: 15px;
`;
const Field = styled.button`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  background-color: slategray;
  color: white;
  position: relative;
  border: none;
  outline: none;
`;
const Circle = styled.div`
  width: 70%;
  height: 70%;
  top: 15%;
  left: 15%;
  background-color: rgb(0, 185, 0);
  position: absolute;
  border-radius: 50%;
  transition: 1s;
  &:before {
    content: "";
    position: absolute;
    left: 11%;
    top: 11%;
    border-radius: 50%;
    height: 78%;
    width: 78%;
    background-color: slategray;
  }
`;

const Square = styled.div`
  transition: 1s;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 15%;
    top: 45%;
    width: 70%;
    height: 10%;
    background-color: red;
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(135deg);
  }
`;

const Container = styled.div`
  display: grid;
  gap: 10px;
  width: 450px;
  height: 450px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background-color: darkslategray;
  margin: auto;
  padding: 10px;
`;

const Move = styled.div`
  text-align: center;
  padding: 3px 0;
  border-radius: 10px;
  transition: 1s;
`;

const Turn = styled.div`
  display: grid;
  width: 540px;
  margin: auto;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
  gap: 30px;
  font-size: 20px;
  font-weight: 500;
  & > ${Move}:nth-child(1) {
    background-color: green;
  }
  & > ${Move}:nth-child(2) {
    background-color: red;
  }
`;

const Win = styled.div`
  position: absolute;
  width: 500px;
  left: calc(50% - 250px);
  top: calc(50% - 15px);
  padding: 5px 30px;
  font-size: 40px;
  text-align: center;
  font-weight: 600;
  background-color: rgb(255, 165, 0, 0.8);
  border-radius: 20px;
  text-transform: uppercase;
`;
const NewGame = styled.p`
  cursor: pointer;
  font-size: 28px;
  text-align: center;
  color: rgb(10, 16, 16);
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 10px;
  text-decoration: underline;
`;

const Games = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 400px;
  margin: auto;
  margin-top: 10px;
  font-size: 18px;
  & > div {
    justify-self: center;
    background-color: rgb(29, 48, 48);
    color: white;
    padding: 5px 20px;
    border-radius: 15px;
  }
`;

class Main extends Component {
  state = {
    squareTurn: false,
    fields: [
      { type: "", element: "", selected: false },
      { type: "", element: "", selected: false },
      { type: "", element: "", selected: false },
      { type: "", element: "", selected: false },
      { type: "", element: "", selected: false },
      { type: "", element: "", selected: false },
      { type: "", element: "", selected: false },
      { type: "", element: "", selected: false },
      { type: "", element: "", selected: false },
    ],
    winer: null,
    CircleWins: 0,
    SquareWins: 0,
    Tie: 0,
  };
  render() {
    return (
      <div>
        <H1> Tic Tac Toe</H1>
        <H4> Czyli wszystkim dobrze znana gra w kółko i krzyżyk. </H4>
        <Turn>
          <Move
            style={{
              opacity: this.state.squareTurn ? "0.6" : "1",
            }}
          >
            {" "}
            Kółko{" "}
          </Move>
          <Move
            style={{
              opacity: this.state.squareTurn ? "1" : "0.6",
            }}
          >
            {" "}
            Krzyżyk{" "}
          </Move>
        </Turn>
        <Container>
          {this.state.fields.map((field, i) => (
            <Field
              key={i}
              onClick={() => this.draw(i)}
              type={field.type}
              disabled={field.selected}
            >
              {field.element}
            </Field>
          ))}
          <Win style={{ display: this.state.winer ? "block" : "none" }}>
            {this.state.winer}
          </Win>
        </Container>

        <Games>
          <div>Kółko: {this.state.CircleWins}</div>
          <div>Krzyżyk: {this.state.SquareWins}</div>
          <div>Remis: {this.state.Tie}</div>
        </Games>

        <NewGame
          onClick={this.reset}
          style={{ display: this.state.winer ? "block" : "none" }}
        >
          Nowa gra
        </NewGame>
      </div>
    );
  }

  // Funckje

  reset = () => {
    let newArray = this.state.fields;
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].type = "";
      newArray[i].element = "";
      newArray[i].selected = false;
    }
    this.setState({ fields: newArray, winer: null, squareTurn: false });
  };

  draw = (element) => {
    if (this.state.squareTurn) {
      let newArray = this.state.fields;
      newArray[element].type = "square";
      newArray[element].selected = true;
      newArray[element].element = (
        <Square style={{ opacity: this.state.squareTurn ? "1" : "0" }} />
      );

      this.setState(
        {
          fields: newArray,
          squareTurn: false,
        },
        () => {
          this.win();
        }
      );
    } else {
      let newArray = this.state.fields;
      newArray[element].type = "circle";
      newArray[element].selected = true;
      newArray[element].element = (
        <Circle style={{ opacity: this.state.squareTurn ? "0" : "1" }} />
      );

      this.setState(
        {
          fields: newArray,
          squareTurn: true,
        },
        () => {
          this.win();
        }
      );
    }
  };

  win = () => {
    let newArray = this.state.fields;
    let who = null;

    if (
      newArray[0].type === newArray[1].type &&
      newArray[0].type === newArray[2].type &&
      newArray[0].type !== ""
    ) {
      who = newArray[0].type;
    } else if (
      newArray[3].type === newArray[4].type &&
      newArray[3].type === newArray[5].type &&
      newArray[3].type !== ""
    ) {
      who = newArray[3].type;
    } else if (
      newArray[6].type === newArray[7].type &&
      newArray[6].type === newArray[8].type &&
      newArray[6].type !== ""
    ) {
      who = newArray[6].type;
    } else if (
      newArray[0].type === newArray[3].type &&
      newArray[0].type === newArray[6].type &&
      newArray[0].type !== ""
    ) {
      who = newArray[0].type;
    } else if (
      newArray[1].type === newArray[4].type &&
      newArray[1].type === newArray[7].type &&
      newArray[1].type !== ""
    ) {
      who = newArray[1].type;
    } else if (
      newArray[2].type === newArray[5].type &&
      newArray[2].type === newArray[8].type &&
      newArray[2].type !== ""
    ) {
      who = newArray[2].type;
    } else if (
      newArray[0].type === newArray[4].type &&
      newArray[0].type === newArray[8].type &&
      newArray[0].type !== ""
    ) {
      who = newArray[0].type;
    } else if (
      newArray[2].type === newArray[4].type &&
      newArray[2].type === newArray[6].type &&
      newArray[2].type !== ""
    ) {
      who = newArray[2].type;
    }

    if (who !== null) {
      for (let i = 0; i < newArray.length; i++) {
        newArray[i].selected = true;
      }
      if (who == "circle") {
        who = "Kółko";
        this.setState({ CircleWins: this.state.CircleWins + 1 });
      } else {
        who = "Krzyżyk";
        this.setState({ SquareWins: this.state.SquareWins + 1 });
      }
      this.setState({ winer: "Wygrywa " + who, fields: newArray });
    } else {
      // Sprawdzenie czy wszystkie pola są zapełnione
      if (
        newArray[0].selected === true &&
        newArray[1].selected === true &&
        newArray[2].selected === true &&
        newArray[3].selected === true &&
        newArray[4].selected === true &&
        newArray[5].selected === true &&
        newArray[6].selected === true &&
        newArray[7].selected === true &&
        newArray[8].selected === true
      ) {
        this.setState({ winer: "Remis", Tie: this.state.Tie + 1 });
      }
    }
  };
}

export default Main;
