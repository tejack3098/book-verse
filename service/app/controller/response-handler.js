// Send a successful response
export const setResponse = (data, response) => {
    response.json(data);
    response.status(200);
}

// Send an error response
export const setError = (error, response) =>{
    console.log(error);
    response.status(500);
    response.json({
        error: {
            code: 'InternalServerError',
            message: 'Error occured while processing the request.'
        }
    })
}