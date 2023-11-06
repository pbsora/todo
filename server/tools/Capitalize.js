function Capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

console.log(Capitalize("teste"));

module.exports = Capitalize;
