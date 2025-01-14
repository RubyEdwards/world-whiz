import { answerRandomiser, funFactRandomiser } from "../../../utils/util.js";
import {
  fetchCountries,
  fetchCountry,
  fetchCountryQuizFacts,
  fetchJournal,
  fetchQuiz,
} from "../models/index.model.js";

export function getCountries(req, res) {
  fetchCountries().then((countries) => {
    res.status(200).send(countries);
  });
}

export function getCountry(req, res) {
  fetchCountry(req).then((country) => {
    if (!country) res.status(404).send("Not found");
    else {
      let randomFact = funFactRandomiser(country);
      let updatedCountry = JSON.parse(JSON.stringify(country));
      updatedCountry.countryinfo.funfact = randomFact;
      res.status(200).send(updatedCountry);
    }
  });
}

export function getQuiz(req, res) {
  const { question } = req.query;
  fetchQuiz(req).then((countryquiz) => {
    if (!countryquiz) res.status(404).send("Not found");
    if (question) {
      const questionIndex = question - 1;
      const answersRandomOrder = answerRandomiser(
        countryquiz.quiz[questionIndex]
      );
      let updatedQuestion = JSON.parse(JSON.stringify(countryquiz));
      updatedQuestion.quiz.answers = answersRandomOrder;
      delete updatedQuestion.quiz[questionIndex].correctAnswer;
      res.status(200).send(updatedQuestion.quiz[questionIndex]);
    } else res.status(200).send(countryquiz);
  });
}

export function getJournal(req, res) {
  fetchJournal().then((countryNames) => {
    let countryList = countryNames.map(({ countryname }) => countryname).sort();
    res.status(200).send(countryList);
  });
}

export function getCountryQuizFacts(req, res) {
  fetchCountryQuizFacts(req).then((quizfacts) => {
    res.status(200).send(quizfacts);
  });
}
