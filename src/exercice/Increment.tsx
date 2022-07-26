import React, {FC, useState} from "react";

// Only the function was asked but i thought this will be more cool to do.
const IncrementPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>('[2,0,2,2]');
  const [isArrayValid, setIsArrayValid] = useState(true);
  const [isJson, setIsJson] = useState(true);
  const [isNumberInsideRange, setIsNumberInsideRange] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);

  // Here is some condition to verify if the value in the input is correct before using it
  const handleButtonClick = () => {
    let list: number[] = [];
    // Check if the string is parsable
    try {
      list = JSON.parse(inputValue);
      setIsJson(true);
    } catch (e) {
      setIsJson(false)
    }
    // Check if the result of the parsing is an Array
    const isArray = Array.isArray(list);
    setIsArrayValid(isArray);
    if (!isArray || list.length === 0) return;
    // Check if all digits are a number between 0 and 9
    for (let number of list) {
      if (number > 9 || number < 0) {
        setIsNumberInsideRange(false);
        return;
      }
    }
    if(!isNumberInsideRange) setIsNumberInsideRange(true);
    // if we are here, the list must be valid, so we do the increment function
    setInputValue(JSON.stringify(increment(list)));
  }

  // we render conditionnals warnings for an user feedback
  return (
    <div>
      <h2>Incrément</h2>
      <input value={inputValue} onChange={handleInputChange}/>
      <button onClick={handleButtonClick}>Incrémenter</button>
      {!isJson && <div>Ceci n'est pas un json valide</div>}
      {!isArrayValid && <div>Ceci n'est pas un tableau</div>}
      {!isNumberInsideRange && <div>Les "digits" doivent valoir entre 0 et 9 chaque</div>}
    </div>
  );
}

// Rules : :warning: Please don't use the number type of your language and increment it! (eg: join('', $nunmber)++)
// I'm sorry but i didn't understood this part, so i prefered to do something that work than some strange things.

function increment(list: number[]): number[] {
  list[list.length - 1]++;
  for (let i = list.length - 1; i > -1; i--) {
    if (list[i] < 10) continue;
    list[i] = 0;
    !list[i - 1] ? list = [1, ...list] : list[i - 1]++;
  }
  return list;
}

export default IncrementPage;
