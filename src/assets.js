/* Get paths & ALT text for icons & emojis | ©The Open University.
*/

module.exports = {
  emoticonCount: emoticonCount,
  iconCount: iconCount,
  getEmoticonName: getEmoticonName,
  getEmoticonPath: getEmoticonPath,
  getIconPath: getIconPath,
  getIconName: getIconName,
  getIconAlt: getIconAlt,
  getBackgroundElements: getBackgroundElements,
  hasEmoticon: hasEmoticon,
  hasIcon: hasIcon
};

const UTIL = require('./util'); // Was: CONFIG = require('./config');

// Presentation variables
const iconFiles = [ {name: 'achievement', file: 'Achievement_card.png', alt: 'Achievement'}, {name: 'admin', file: 'Admin_card.png', alt: 'Admin and forms'}, {name: 'assessment', file: 'Assessments_card.png', alt: 'Assessment'}, {name: 'barrier', file: 'Barrier_card.png', alt: 'Barrier'}, {name: 'communication', file: 'Communication_card.png', alt: 'Communication'}, {name: 'confidence', file: 'ConfidenceBoost_card.png', alt: 'Confidence boost'}, {name: 'considerstudy', file: 'ConsiderStudy_card.png', alt: 'Considering study'}, {name: 'duedates', file: 'DueDates_card.png', alt: 'Due dates'}, {name: 'employment', file: 'Employment_card.png', alt: 'Jobs and employment'}, {name: 'finances', file: 'Finances_card.png', alt: 'Finances'}, {name: 'helpneeded', file: 'Needed_card.png', alt: 'Help needed'}, {name: 'highpressure', file: 'HighPressure_card.png', alt: 'High pressure'}, {name: 'information', file: 'Information_card.png', alt: 'Finding information'}, {name: 'lostdirection', file: 'LostDirection_card.png', alt: 'Lost direction'}, {name: 'lowenergy', file: 'LowEnergy_card.png', alt: 'Low energy'}, {name: 'lowscores', file: 'LowScores_card.png', alt: 'Low scores'}, {name: 'moving', file: 'Moving_card.png', alt: 'Moving home'}, {name: 'nosupport', file: 'NoSupport_card.png', alt: 'No support'}, {name: 'peersupport', file: 'PeerSupport_card.png', alt: 'Peer support'}, {name: 'problem', file: 'Problem_card.png', alt: 'Problem'}, {name: 'register', file: 'Register_card.png', alt: 'Registering'}, {name: 'repetition', file: 'Repetition_card.png', alt: 'Repetition'}, {name: 'studybreak', file: 'StudyBreak_card.png', alt: 'Break from study'}, {name: 'studyexperience', file: 'StudyExperience_card.png', alt: 'Study experience'}, {name: 'studygoal', file: 'StudyGoal_card.png', alt: 'Goal'}, {name: 'studymilestone', file: 'StudyMilestone_card.png', alt: 'Study milestone'}, {name: 'studysuccess', file: 'StudySuccess_card.png', alt: 'Study success'}, {name: 'studysupport', file: 'StudySupport_card.png', alt: 'Study support'}, {name: 'timelost', file: 'TimeLost_card.png', alt: 'Time lost'} ];
const emoticonFiles = [ {name: 'proud', file: 'Proud_emoji.png'}, {name: 'angry', file: 'Angry_emoji.png'}, {name: 'anxious', file: 'Anxious_emoji.png'}, {name: 'bored', file: 'Bored_emoji.png'}, {name: 'confident', file: 'Confident_emoji.png'}, {name: 'confused', file: 'Confused_emoji.png'}, {name: 'curious', file: 'Curious_emoji.png'}, {name: 'embarrassed', file: 'Embarrassed_emoji.png'}, {name: 'excited', file: 'Excited_emoji.png'}, {name: 'happy', file: 'Happy_emoji.png'}, {name: 'nervous', file: 'Nervous_emoji.png'}, {name: 'scared', file: 'Scared_emoji.png'}, {name: 'unwell', file: 'Unwell_emoji.png'}, {name: 'stressed', file: 'Stressed_emoji.png'}, {name: 'thinking', file: 'Thinking_emoji.png'}, {name: 'tired', file: 'Tired_emoji.png'}, {name: 'unhappy', file: 'Unhappy_emoji.png'}, {name: 'upset', file: 'Upset_emoji.png'} ];
const backgroundElements = ['head_background', 'pencil_background', 'plant_background', 'calc_background', 'biscuits_background', 'glasses_background', 'folder_background', 'coffee_background', 'pens_background', 'graph_background', 'jammie_background', 'pencil_background', 'biscuits_background_2', 'plant_background_2', 'tablet_background', 'calc_background_2', 'tablet_background_2', 'glasses_background_2', 'coffee_background_2', 'pens_background_2', 'folder_background_2', 'graph_background_2', 'jammie_background_2', 'coffee_background_3'];
const emojiDir = '/emoji/';
const cardDir = '/card/';

function emoticonCount () {
  return emoticonFiles.length;
}

function iconCount () {
  return iconFiles.length;
}

function getEmoticonPath (j) {
  return UTIL.config('assetUrl') + emojiDir + emoticonFiles[ j ].file;
}

function getEmoticonName (j) {
  return emoticonFiles[ j ].name;
}

function getIconPath (j) {
  return UTIL.config('assetUrl') + cardDir + iconFiles[ j ].file;
}

function getIconName (j) {
  return iconFiles[ j ].name;
}

function hasEmoticon (j, element) {
  return emoticonFiles[ j ].name === element.emoticon;
}

function hasIcon (j, element) {
  return iconFiles[j].name === element.icon;
}

function getIconAlt (j, element) {
  return iconFiles[j].alt;
}

function getBackgroundElements () {
  return backgroundElements;
}
