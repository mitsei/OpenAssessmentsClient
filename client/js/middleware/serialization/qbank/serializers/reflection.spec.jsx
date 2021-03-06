import reflection             from './reflection';
import genusTypes             from '../../../../constants/genus_types';

describe('reflection serializer', () => {
  let item;
  let newItemAttr;
  let result;

  beforeEach(() => {
    item = {
      question: {
        correctFeedback: { answerId: '1' },
        choices: [{
          id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
          text: 'the bus',
          wordType: 'noun',
        },
        {
          id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
          text: 'the airport',
          wordType: 'noun',
        }],
      },
      answers: [{
        feedback: { text: '<p>Howdy</p>' },
        genusTypeId: genusTypes.answer.rightAnswer,
        fileIds: {},
        choiceIds: []
      }, {
        feedback: { text: '<p>hiya</p>' },
        genusTypeId: genusTypes.answer.wrongAnswer,
        fileIds: {}
      }],
      language: '639-2%3AENG%40ISO',
    };
    newItemAttr = {
      question: {
        choices: [{},
        {}],
        correctFeedback: {
          text: 'correctText',
          fileIds: {},
          id: '1',
        },
      },
    };
    result = reflection(item, newItemAttr);
  });

  it('serializes the choices', () => {
    const expectedChoices = [
      {
        id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
        text: 'the bus',
        order: undefined,
        delete: undefined,
      },
      {
        id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
        text: 'the airport',
        order: undefined,
        delete: undefined,
      },
    ];
    expect(result.question.choices).toEqual(expectedChoices);
  });

  it('serializes the answers', () => {
    const expectedAnswers = [
      {
        id: undefined,
        genusTypeId: 'answer-type%3Aright-answer%40ODL.MIT.EDU',
        feedback: {
          text: 'correctText',
          languageTypeId: undefined,
          formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
          scriptTypeId: undefined,
        },
        type: 'answer-record-type%3Amulti-choice-answer%40ODL.MIT.EDU',
        choiceIds:
        ['id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
          'id969e920d-6d22-4d06-b4ac-40a821e350c6']
      },
    ];
    expect(result.answers).toEqual(expectedAnswers);
  });
});
