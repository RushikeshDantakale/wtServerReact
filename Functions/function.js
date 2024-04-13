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

module.exports =  { generateCodeString , convertToSeconds , convertSecondsToHoursAndMinutes } 