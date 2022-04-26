

export const getMembers = () => {
    console.log("in fitness-api: ")
    const URL = 'http://localhost:3001/members'
    return fetch(URL)
}



export const getExercises = () => {
    const URL = 'http://localhost:3001/exercises'
    return fetch(URL)
}



export const deleteExercise = (id) => {
    console.log("in fitness-API:", id)
    const URL =  `http://localhost:3001/exercises/${id}`
    return fetch(URL, {method: 'DELETE'})
}

export const createExercise = (formInput) => {
    console.log("Form Input: ", formInput)
    const URL = 'http://localhost:3001/exercises/add'
    return fetch(URL, {body:JSON.stringify(formInput), method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(res=>res.json())
}

export const editExercise = (formInput,id) => {
    const URL = `http://localhost:3001/exercises/${id}`
    return fetch(URL, {body: JSON.stringify(formInput), METHOD: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }  
    })
}

export const createMember = (formInput) => {
    const URL = 'http://localhost:3001/members/add'
    return fetch(URL, {body:JSON.stringify(formInput), method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
})
}