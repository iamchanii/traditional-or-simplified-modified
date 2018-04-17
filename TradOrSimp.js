var characters = require('./characters');

function isTraditional(str) {
  if (detect(str).detectedCharacters == 'traditional') {
    return true;
  } else {
    return false;
  }
}

function isSimplified(str) {
  if (detect(str).detectedCharacters == 'simplified') {
    return true;
  } else {
    return false;
  }
}

function detect(str) {
  var result = {
    inputLength: str.length,
    simplifiedCharacters: 0,
    traditionalCharacters: 0
  };

  for (var i = 0; i < str.length; i++) {
    var char = str.substr(i, 1);
    //get both
    if (charIsS(char)) {
      result.simplifiedCharacters++;
    }

    if (charIsT(char)) {
      result.traditionalCharacters++;
    }

    if (i == str.length - 1) {
      if (result.simplifiedCharacters > result.traditionalCharacters) {
        result.detectedCharacters = 'simplified';
        result.detectionRate = result.simplifiedCharacters / result.traditionalCharacters | 1;
      } else if (result.simplifiedCharacters < result.traditionalCharacters) {
        result.detectedCharacters = 'traditional';
        result.detectionRate = result.traditionalCharacters / result.simplifiedCharacters | 1;
      } else {
        result.detectedCharacters = 'unknown';
        result.detectionRate = 0;
      }
      return result;
    }
  }
}

function charIsS(char) {
  var escapedChar = escapeRegExp(char);
  return new RegExp(escapedChar).test(characters.simplified);
}

function charIsT(char) {
  var escapedChar = escapeRegExp(char);
  return new RegExp(escapedChar).test(characters.traditional);
}

//to escape special characters
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function extract(str, target) {
  var result = {
    simplified: [],
    traditional: [],
  };

  for (var i = 0; i < str.length; i++) {
    var char = str.substr(i, 1);

    if ((target === 'all' || target === 'simplified') && charIsS(char)) {
      result.simplified.push(char);
    }

    if ((target === 'all' || target === 'traditional') && charIsT(char)) {
      result.traditional.push(char);
    }
  }

  return result;
}

function extractAll(str) {
  return extract(str, 'all');
}

function extractSimplified(str) {
  return extract(str, 'simplified').simplified;
}

function extractTraditional(str) {
  return extract(str, 'traditional').traditional;
}

module.exports = {
  isTraditional: isTraditional,
  isSimplified: isSimplified,
  detect: detect,
  extractAll: extractAll,
  extractTraditional: extractTraditional,
  extractSimplified: extractSimplified
};