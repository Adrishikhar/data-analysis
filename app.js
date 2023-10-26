const url = "https://one00x-data-analysis.onrender.com/assignment?email=adrishikhardeka@gmail.com"

const XAssignmentID = "82f2a3d3-13c2-46f2-94e2-c75d39747a04"

const fetchData = async () => {
	const response = await fetch(url)
	return response
}

const postData = async (answer) => {
	const postedData = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(answer),
	})
	const status = await postedData.json()
	return status
}

const mostUsedWords = (data) => {
	// Elementary Search Algorithm
	let max = 0
	let count = 0
	let answers = []
	let uniqueWords = new Set(data)

	uniqueWords.forEach((word) => {
		count = data.filter((e) => e === word).length //finds occurences of a word
		if (count > max) {
			max = count
			answers = [word]
		} else if (count === max) {
			answers.push(word)
		}
	})

	return answers
}

const run = async () => {
	try {
		const data = await fetchData()

		if (data.status === 200) {
			const assignment_id = data.headers.get("x-assignment-id")

			const words = await data.json()
			const answers = mostUsedWords(words)

			for (let i = 0; i < answers.length; i++) {
				const status = await postData({
					assignment_id: assignment_id,
					answer: answers[i],
				})
				console.log(`${status.result} \tfor ${answers[i]}`)
			}
		} else if (data.status === 500) {
			console.log("500 HTTPS Error!")
		}
	} catch (error) {
		console.log(error)
	}
}

run()
