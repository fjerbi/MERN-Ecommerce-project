import express from "express";

import aposToLexForm  from 'apos-to-lex-form'
import natural  from 'natural'
import SpellCorrector from 'spelling-corrector'
import SW from 'stopword'

// @desc Fetch all products
// @route GET /api/products
// @access Public route
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const getMood =async (req, res, next) => {
    const { review } = req.body;
  const lexedReview = aposToLexForm(review);
  const casedReview = lexedReview.toLowerCase();
  const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');

  const { WordTokenizer } = natural;
  const tokenizer = new WordTokenizer();
  const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

  tokenizedReview.forEach((word, index) => {
    tokenizedReview[index] = spellCorrector.correct(word);
  })
  const filteredReview = SW.removeStopwords(tokenizedReview);

  const { SentimentAnalyzer, PorterStemmer } = natural;
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
  const analysis = analyzer.getSentiment(filteredReview);

  res.status(200).json({ analysis });
}

export { getMood };
