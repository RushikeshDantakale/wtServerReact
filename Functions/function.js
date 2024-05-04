const generateCodeString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codeString = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      codeString += characters[randomIndex];
    }
  
    return codeString;
  }

  const convertToSeconds = (hours, minutes) => {
    return (hours * 60 * 60) + (minutes * 60);
};

const convertSecondsToHoursAndMinutes = (seconds) => {
  const hr = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const min = Math.floor(remainingSeconds / 60);
  return { hr, min };
};

const  getCorrectAnsIndex = (givenAnswerArray , targetArray ) => {
  return givenAnswerArray.reduce((indices, ans, index) => {
      // Check if the lengths of the arrays match
      if (ans.length !== targetArray[index].length) return indices;

      // Compare each element of the arrays individually
      if (ans.length === 1 && ans[0] === targetArray[index][0]) {
          indices.push(index); // If single-element arrays match, push the index
      } else {
          let match = true;
          for (let i = 0; i < ans.length; i++) {
              if (ans[i] !== targetArray[index][i]) {
                  match = false;
                  break;
              }
          }
          if (match) indices.push(index); // If all elements match, push the index
      }
      return indices;
  });
}

module.exports =  { generateCodeString , convertToSeconds , convertSecondsToHoursAndMinutes ,getCorrectAnsIndex } 