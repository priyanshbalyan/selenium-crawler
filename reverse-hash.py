def hash(s):
	h = 7
	letters = 'acdegilmnoprstuw'
	for i in range(len(s)):
		h = (h*37 + letters.index(s[i]))

	return h

def solution(hash_value):
	letters = 'acdegilmnoprstuw'
	res = ''
	while hash_value > 0:
		remainder = hash_value % 37
		if remainder <= len(letters):
			res += letters[remainder]
			hash_value = (hash_value - remainder) // 37
		else:
			return

		if hash_value == 7:
			return res[::-1]
	
	return None	

print(solution(680131659347))
print(solution(930846109532517))