export const parse = dataInput => {
  
  const data = dataInput
  const titles = data.map(x => x.title)
  const cleanSentences = titles.map(x => x.replace(/[-|()/_*<>~`'".:]/g,""))
  const wordsToClean = [
  'it',
  'is',
  'the',
  'of',
	'with',
	'at',
	'from',
	'into',
	'during',
	'including',
	'until',
	'against',
	'among',
	'throughout',
	'despite',
	'towards',
	'upon',
	'concerning',
	'to',
	'in',
	'for',
	'on',
	'by',
	'about',
	'like',
	'through',
	'over',
	'before',
	'between',
	'after',
	'since',
	'without',
	'under',
	'within',
	'along',
	'following',
	'across',
	'behind',
	'beyond',
	'plus',
	'except',
	'but',
	'up',
	'out',
	'around',
	'down',
	'off',
	'above',
	'near'
  ]

  
  
  const words = cleanSentences.map(x => x.split(" "))
  const valuedWords = words.map(x=> x.filter(y => !wordsToClean.includes(y)))
  const cleanWords = valuedWords.map(x => x.filter(y => y !==  " " && y.length < 20 && y.length > 1 && !y.includes(".")))

  const merged = [].concat.apply([], cleanWords)

  const count = {};

  for (const element of merged) {
    if (count[element]) {
       count[element] += 1;
    } else {
      count[element] = 1;
    }
  }

  let sortable = []

  for (var word in count) {
      sortable.push([word, count[word]]);
  }

  sortable.sort(function(a, b) {
      return a[1] - b[1]
  })

  const reversed = sortable.reverse()
  
  return reversed
}
