import React from "react"
import autoBind from "react-autobind"
import styled, { ThemeProvider } from "styled-components"
import "./App.css"
import AnswerButton from "./components/answerButton"
import NextButton from "./components/nextButton"
import ScoreCalculation from "./score"
import theme from "./theme"


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
      <NextButton
        onClick={ this.nextChallenge }
        text={ this.props.content.shared.texts.next } />
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
