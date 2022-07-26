import React, {FC} from "react";

const FizzbuzzPage: FC<{ limit: number }> = ({limit}) => {
  let result = '';
  for (let i = 1; i <= limit; i++) {
    let iteration = '';
    // if x % y === 0, x is a multible of y
    if (i % 3 === 0) iteration += 'Fizz';
    if (i % 5 === 0) iteration += 'Buzz';
    // if iteration === '', iteration isn't a multible of 3 nor 5
    result += (iteration === '' ? i : iteration) + ', ';
  }
  // substract the last ', ' for aesthetic
  result = result.substring(0, result.length - 2);

  return (
    <div>
      <h2>FizzBuzz</h2>
      <div>{result}</div>
    </div>
  )
}

export default FizzbuzzPage;
