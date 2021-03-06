import _    from 'lodash';
import $    from 'jquery';

import genusTypes                 from '../../constants/genus_types';
import { languages, getLanguage } from '../../constants/language_types';

export function scrub(item, protectedKeys) {
  if (_.isPlainObject(item)) {
    return _.omitBy(item, (val, key) => (
      (_.isNil(val) && !_.includes(protectedKeys, key))
      || (_.isObject(val) && _.isEmpty(val) && !_.includes(protectedKeys, key))
    ));
  }

  return _.reject(item, val => (
    _.isNil(val) || (_.isObject(val) && _.isEmpty(val))
  ));
}

export function languageText(text, language) {
  if (_.isNil(text)) return null;
  return {
    text,
    languageTypeId: language,
    formatTypeId: languages.formatTypeId,
    scriptTypeId: languages.scriptTypeId[getLanguage(language)]
  };
}

export function getSingleCorrectAnswer(originalItem, question, language) {
  const answer = {
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: languageText(question.correctFeedback.text, language),
    fileIds: question.correctFeedback.fileIds,
  };

  if (_.get(originalItem, 'question.correctFeedback')) {
    answer.id = originalItem.question.correctFeedback.answerId;
  }

  return answer;
}

export function createSingleCorrectFeedback(item) {
  return {
    text: _.get(item, 'answers[0].feedback.text'),
    texts: _.get(item, 'answers[0].feedbacks'),
    answerId: _.get(item, 'answers[0].id'),
    fileIds: _.get(item, 'answers[0].fileIds'),
  };
}

export function buildChoiceText(text, wordType) {
  return `<p ${wordType ? `class="${wordType}"` : ''}>${text}</p>`;
}

export function parseChoiceText(text) {
  const parsedInput = $.parseHTML(text);
  return $(parsedInput).text();
}

export function deserializeChoiceTexts(texts) {
  return _.reduce(texts, (allTexts, text) => {
    allTexts[text.languageTypeId] = text.text; // eslint-disable-line no-param-reassign
    return allTexts;
  }, {});
}


export function parseChoiceWordType(text) {
  const parsedInput = $.parseHTML(text);
  return $(parsedInput).attr('class');
}

export function getImageUrl(text) {
  const parsedInput = $.parseHTML(text);
  const img = $(parsedInput).find('img');
  const src = $(parsedInput).attr('src');
  if (img && !src) {
    return $(img).attr('src');
  }
  return src;
}
