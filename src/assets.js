/*!
  Get paths to icon and emoji files. | © 2018 The Open University (IET-OU).
*/

module.exports = {
  emoticonCount: emoticonCount,
  iconCount: iconCount,

  getEmoticonPath: getEmoticonPath,
  getIconPath: getIconPath,

  hasEmoticon: hasEmoticon,
  hasIcon: hasIcon
};

// Presentation variables
const iconFiles = [ {name: 'achievement', file: 'Achievement_card.png'}, {name: 'admin', file: 'Admin_card.png'}, {name: 'assessment', file: 'Assessments_card.png'}, {name: 'communication', file: 'Communication_card.png'}, {name: 'confidence', file: 'ConfidenceBoost_card.png'}, {name: 'duedates', file: 'DueDates_card.png'}, {name: 'helpneeded', file: 'HelpNeeded_card.png'}, {name: 'highpressure', file: 'HighPressure_card.png'}, {name: 'information', file: 'Information_card.png'}, {name: 'lostdirection', file: 'LostDirection_card.png'}, {name: 'lowenergy', file: 'LowEnergy_card.png'}, {name: 'lowscores', file: 'LowScores_card.png'}, {name: 'nosupport', file: 'NoSupport_card.png'}, {name: 'peersupport', file: 'PeerSupport_card.png'}, {name: 'problem', file: 'Problem_card.png'}, {name: 'register', file: 'Register_card.png'}, {name: 'studybreak', file: 'StudyBreak_card.png'}, {name: 'studyexperience', file: 'StudyExperience_card.png'}, {name: 'studygoal', file: 'StudyGoal_card.png'}, {name: 'studymilestone', file: 'StudyMilestone_card.png'}, {name: 'studysuccess', file: 'StudySuccess_card.png'}, {name: 'studysupport', file: 'StudySupport_card.png'}, {name: 'timelost', file: 'TimeLost_card.png'} ];
const emoticonFiles = [ {name: 'angry', file: 'Angry_emoji.png'}, {name: 'achieve', file: 'Achieve_emoji.png'}, {name: 'bored', file: 'Bored_emoji.png'}, {name: 'confused', file: 'Confused_emoji.png'}, {name: 'excited', file: 'Excited_emoji.png'}, {name: 'happy', file: 'Happy_emoji.png'}, {name: 'nervous', file: 'Nervous_emoji.png'}, {name: 'sick', file: 'Sick_emoji.png'}, {name: 'angry', file: 'Angry_emoji.png'}, {name: 'achieve', file: 'Achieve_emoji.png'}, {name: 'unhappy', file: 'Unhappy_emoji.png'}, {name: 'upset', file: 'Upset_emoji.png'}, {name: 'thinking', file: 'Thinking_emoji.png'} ];
// var assetDir = 'assets/';
const emojiDir = 'assets/emoji/';
const cardDir = 'assets/card/';

function emoticonCount () {
  return emoticonFiles.length;
}

function iconCount () {
  return iconFiles.length;
}

function getEmoticonPath (j) {
  return emojiDir + emoticonFiles[ j ].file;
}

function getIconPath (j) {
  return cardDir + iconFiles[ j ].file;
}

function hasEmoticon (j, element) {
  return emoticonFiles[ j ].name === element.emoticon;
}

function hasIcon (j, element) {
  return iconFiles[j].name === element.icon;
}
