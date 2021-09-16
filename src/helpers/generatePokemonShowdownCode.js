import capitalize from "./capitalize";

export default (pokemons) => {
  return pokemons.map(pokemon =>
    `
    ${capitalize(pokemon.name)}
      Ability: none
      Level: ${pokemon.level}
    ` + pokemon.moves.map(move =>
      `- ${capitalize(move.name)}
      `).join('')
  ).join('');
}
