// const API = 'https://api-cms.puzzland.dals.media';
const API = 'http://0.0.0.0:666/api/';

const levelConstants = {
  level: 'level/',
  types: 'level/types',
  complexities: 'level/complexities',
  facts: 'level/facts/',
  config: 'level/config'
};

const cityConstants = {
  city: 'city/'
};

const countryConstants = {
  country: 'country/'
};

const statisticsConstants = {
  stat: 'statistics/game/',
  diagram: 'statistics/game/diagram'
};

const userConstants = {
    list: 'user/list/',
    config: 'user/config/',
    tracker: 'user/tracker'
};

const gameSession = {
    session: 'game-session/',
    one: 'game-session/one/',
};

const patchNoteConstants = {
    patchNote: 'patch-note/'
};

export { API, levelConstants, cityConstants, countryConstants, statisticsConstants, userConstants, gameSession, patchNoteConstants}
