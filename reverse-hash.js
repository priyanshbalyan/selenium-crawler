function solution(hash_value) {
	const letters = 'acdegilmnoprstuw';
	let res = [];
	while (hash_value > 0) {
		remainder = hash_value % 37;
		if (remainder <= letters.length){
			res.push(letters[remainder]);
			hash_value = Math.floor((hash_value - remainder)/37)
		} else
			return null;

		if (hash_value === 7) return res.reverse().join('');
	}
	return null;
}

console.log(solution(680131659347));
console.log(solution(930846109532517))