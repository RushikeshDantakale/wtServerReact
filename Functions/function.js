const generateCodeString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codeString = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      codeString += characters[randomIndex];
    }
  
    return codeString;
  }

module.exports =  { generateCodeString } 