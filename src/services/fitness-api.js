
export const getMembers = () => {
    const URL = 'skfitnessapi.herokuapp.com/members'
    return fetch(URL)
}

export const getExercises = () => {
    const URL = 'skfitnessapi.herokuapp.com/exercises'
    return fetch(URL)
}

export const getTheExercise = (id) => {
    const URL = `skfitnessapi.herokuapp.com/exercises/${id}`
    return fetch(URL)
}

export const deleteExercise = (id) => {
    const URL =  `skfitnessapi.herokuapp.com/exercises/${id}`
    return fetch(URL, {method: 'DELETE'})
}

export const createExercise = (formInput) => {
    const URL = 'skfitnessapi.herokuapp.com/exercises/add'
    return fetch(URL, {body:JSON.stringify(formInput), method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(res=>res.json())
}

export const editExercise = (formInput,id) => {
    const URL = `skfitnessapi.herokuapp.com/exercises/edit/${id}`
    return fetch(URL, {body: JSON.stringify(formInput), method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }  
    })
}

export const createMember = (formInput) => {
    const URL = 'skfitnessapi.herokuapp.com/members/add'
    return fetch(URL, {body:JSON.stringify(formInput), method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
})
}