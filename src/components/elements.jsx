import React, { Component } from "react";
import styled, { ThemeConsumer } from "styled-components";

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
  background-color: green;
  position: absolute;
  border-radius: 50%;
  transition: 1s;
  opacity: 0;
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
  opacity: 0;
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

class Element extends Component {
  state = {
    squareTurn: true,
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
  };

  render() {
    return (
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
        <div>Wygrywa {this.state.winer}</div>
      </Container>
    );
  }

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
      } else {
        who = "Krzyżyk";
      }
      this.setState({ winer: who, fields: newArray });
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
        this.setState({ winer: "nikt" });
      }
    }
  };
}

export default Element;
