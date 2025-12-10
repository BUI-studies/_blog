import genres from './data.json' with { type: 'json' };
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@11.1.0/dist/esm-browser/index.js';

// функція яка вміє рабить обʼєкт { [oldId]: newId }
const getIdsMap = items => items.reduce((acc, item) => {
  acc[item.id] = `NEW__${uuidv4()}`; //буквально ЄДИНЕ що вона робить
  return acc;
}, {})

const refreshIds = (items, idsMap) => items.map(item => {
  const {id, fatherGenreId, ...restProps} = item
  // захист від дібіла
  if (id === fatherGenreId) throw new Error('Ideantifier must be different from fatherGenreId.');

  // знаходимо відповідники старим айдішкам 
  const newId = idsMap[id];
  const newFatherGenreId = fatherGenreId ? idsMap[fatherGenreId] : null;

  // захист від ще одного дібіла
  if (newId === id && newId === fatherGenreId) throw new Error('Ideantifier must be different from fatherGenreId after change.');

  // випльовуємо на волю усе це разом
  return {
    id: newId,
    parentGenreId: newFatherGenreId,
    ...restProps
  }
})

const idsMap = getIdsMap(genres);
const newGenres = refreshIds(genres, idsMap);

console.log('Old genres:', genres);
console.log('New genres:', newGenres);

console.log("NEW rock", newGenres.find(g => g.tag.toLowerCase() === 'rock'));
console.log("OLD rock", genres.find(g => g.tag.toLowerCase() === 'rock'));