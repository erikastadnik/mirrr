import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  //console.log(response.data)
  return response.data
}

const updateVote = async (id) => {
  const response = await axios.get(baseUrl)
  const anecdotes = response.data
  const anecdoteToVote = anecdotes.find(n => n.id === id)
  const newVote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
  const updatedVotes = anecdotes.map(anecdote => anecdote.id !== id ? anecdote : newVote)
  updatedVotes.sort((a, b) => {return b.votes - a.votes})
  //console.log(updatedVotes)
  

  //const deletedResponse = await axios.delete(baseUrl)
  await axios.put(`${baseUrl}/${id}`, newVote)
  
  return updatedVotes
}


export default {
  getAll,
  createNew,
  updateVote
}