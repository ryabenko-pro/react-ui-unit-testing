function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const API = {
    async get() {
        await sleep(500)

        return await fetch("/data.json")
            .then(response => response.json())
            .then(response => response.data)
    }
}

export default API