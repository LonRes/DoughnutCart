// simulate bad network connection
const chanceOfRequestFailing = 0.7

const faultyFetch = url => {
  return Math.random() < chanceOfRequestFailing ? Promise.reject() : fetch(url)
}

const fetchTimeouts = [0, 100, 200, 500]

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const request = async url => {
  for (const timeout of fetchTimeouts) {
    try {
      const response = await faultyFetch(url)
      return response
    } catch (e) {}
    await sleep(timeout)
  }
  return {
    json() {
      return {data: [], next: null, error: true}
    }
  }
}

export default request
