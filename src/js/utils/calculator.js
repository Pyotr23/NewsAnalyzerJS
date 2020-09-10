export const getCountInTitle = (articles, word) => {
  word = word.toLowerCase();
  const regex = new RegExp(`${word}`, 'is');
  return articles.reduce((sum, curr) => {
    const title = curr.title.toLowerCase();
    return sum + title.split(regex).length - 1;
  }, 0);
}
