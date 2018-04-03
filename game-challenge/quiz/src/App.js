import React from "react"
import autoBind from "react-autobind"
import styled, { ThemeProvider } from "styled-components"
import "./App.css"
import AnswerButton from "./components/answerButton"
import Button from "./components/button"
import ScoreCalculation from "./score"

const theme = {
  colors: {
    primary: "#f5a159",
    secondary: "#e5e5e5",
    primaryFont: "#000000",
    secondaryFont: "#7b7b7b",
    areaColor: "#e05633",
    rightAnswer: "#00d700",
    wrongAnswer: "#f3352f"
  },
  layout: {
    offsetX: "5vh",
    borderRadius: "15px",
    buttonBorder: "3px",
  },
  font: {
    headline: { size: "4vh", weight: "bold", color: "#000000" },
    button: { size: "3vh", weight: "normal", color: "#000000" },
    text: { size: "2vh", weight: "normal", color: "#777777" }
  }
}

const Container = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: ${props => props.theme.layout.offsetX};
  padding-right: ${props => props.theme.layout.offsetX};
  
  height: 100%;
`

const QuestionText = styled.div`
  font-size: ${props => props.theme.font.headline.size};
  font-weight: ${props => props.theme.font.headline.weight};
  color: ${props => props.theme.font.headline.color};
  text-align: center;
`

const QuestionTitle = styled.div`
  font-size: ${props => props.theme.font.text.size};
  font-weight: ${props => props.theme.font.text.weight};
  color: ${props => props.theme.font.text.color};
  text-align: center;
`

export default class App extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.points = { bonus: 0, score: 0 }
    this.state = { confirmed: false }
  }

  componentDidMount() {
    this.startTime = new Date()
  }

  render() {
    const { question } = this.props.content
    return (
      <ThemeProvider theme={ theme }>
        <Container>
          <QuestionTitle>Frage:</QuestionTitle>
          <QuestionText>{ question }</QuestionText>
          { this.renderAnswers() }
          { this.renderNextButton() }
        </Container>
      </ThemeProvider>
    )
  }

  renderAnswers() {
    const answers = [1, 2, 3, 4].map(i => this.props.content[`answer${i}`])

    return answers.map((answer, i) =>
      <AnswerButton
        key={ i + 1 }
        onClick={ !this.state.confirmed ? () => this.confirm(i + 1) : () => {} }
        selection={ this.getSelection(i + 1) }>
        {
          answer
        }
      </AnswerButton>
    )
  }

  renderNextButton() {
    return this.state.confirmed &&
      <Button onClick={ this.nextChallenge }>
        { this.props.content.shared.texts.next }
      </Button>
  }

  getSelection(i) {
    const { correctAnswer } = this.props.content
    if (this.state.confirmed) {
      if (i === correctAnswer) {
        return "right"
      } else if (this.state.confirmed === i) {
        return "wrong"
      }
    }
  }

  confirm(answerIndex) {
    const { correctAnswer, scoreCalculation, shared } = this.props.content
    this.timeToAnswer = (new Date() - this.startTime) / 1000
    if (answerIndex === correctAnswer) {
      const scoreCalc = new ScoreCalculation(
        this.timeToAnswer,
        { ...scoreCalculation, gameFactor: shared.config.quizFactor }
      )
      this.points = scoreCalc.getScore()
    }
    this.setState({ confirmed: answerIndex })
  }

  nextChallenge() {
    this.props.completeChallenge(this.points.score + this.points.bonus)
  }
}
