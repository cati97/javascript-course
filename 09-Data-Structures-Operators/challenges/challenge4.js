///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀

*/

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

const textAreaUserInput = document.querySelector("textarea");

const desiredLen = 20;

document.querySelector("button").addEventListener("click", () => {
  const userInput = textAreaUserInput.value;
  const variables = userInput.split("\n");
  for (const [i, variable] of variables.entries()) {
    console.log(convertToCamelCase(variable).padEnd(desiredLen, " ") + "✅".repeat(i + 1));
  }
});

function convertToCamelCase(variableName) {
  const [firstWord, secondWord] = variableName.trim().split("_");
  const firstWordLowerCase = firstWord.toLowerCase();
  const secondWordCapitalize = secondWord
    .toLowerCase()
    .replace(secondWord.toLowerCase()[0], secondWord[0].toUpperCase());
  return firstWordLowerCase + secondWordCapitalize;
}

// for testing purposes
// console.log(convertToCamelCase("underscore_case"));
// console.log(convertToCamelCase(" first_name"));
// console.log(convertToCamelCase("Some_Variable"));
// console.log(convertToCamelCase(" calculate_AGE"));
// console.log(convertToCamelCase("delayed_departure"));

// const multilineString = `underscore_case\n first_name\nSome_Variable\n calculate_AGE\ndelayed_departure`;
// console.log(multilineString);
