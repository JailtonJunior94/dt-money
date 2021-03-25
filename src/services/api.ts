import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://financialcontrol-api.herokuapp.com',
    headers: {
        Authorization: `
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphaWx0b24uanVuaW9yOTRAb3V0bG9vay5jb20iLCJleHAiOiIyMDIxLTA0LTIzVDIxOjI2OjEzLjcwMjExMzE3OC0wMzowMCIsInN1YiI6IkY5NzhGOTY5LTNFQjYtNEQwRS04RTRFLTMyNzBBMjBGMzUxMyJ9.STmE7t-SJZNK2qUsqR8-WmCGXc1fOGS30Joe9tzwISQ`,
    },
});