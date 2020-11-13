import React from 'react';
import { Route, Switch } from 'react-router-dom';

import QuestionListPage from "./pages/QuestionListPage";
import NewQuestionPage from "./pages/NewQuestionPage";
import { createQuestion, getQuestions } from './services/api';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      isLoading: false,
    }

    this.getQuestions = this.getQuestions.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
  }

  async getQuestions() {
    this.setState({ isLoading: true }, async () => {
      const questions = await getQuestions();
      this.setState({
        questions,
        isLoading: false,
      });
    })
  }

  async createQuestion(question) {
    this.setState({ isLoading: true }, async () => {
      await createQuestion(question);
      this.setState({
        isLoading: false,
      });
    })
  }

  render() {
    const { questions, isLoading } = this.state;
    return (
      <main className="App">
        <header className="main-header">
          <section className="main-header-title">
            <h3>🌽 Corn Questions</h3>
          </section>
        </header>
        <section className="main-section">
          <Switch>
            <Route
              path="/new-question"
              render={(props) => <NewQuestionPage {...props} createQuestion={this.createQuestion} />}
            />
            <Route
              path="/"
              render={(props) => <QuestionListPage {...props} getQuestions={this.getQuestions} questions={questions} isLoading={isLoading} />}
            />
          </Switch>
        </section>
      </main>
    );
  }
}

export default App;
