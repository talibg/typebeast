const API_URL = 'http://localhost:3000/api/v1'

export const postUsers = async (
    username: string,
    email: string,
    password: string,
) =>
    await fetch(`${API_URL}/users`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    })

export const fetchUsers = async () => await fetch(`${API_URL}/users`)

export const getSession = async () =>
    await fetch(`${API_URL}/sessions`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })

export const postSessions = async (email: string, password: string) =>
    await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

export const deleteSessions = async () =>
    await fetch(`${API_URL}/sessions`, {
        method: 'DELETE',
        credentials: 'include',
    })

export const postSnippets = async (title: string, code: string) =>
    await fetch(`${API_URL}/snippets`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, code }),
    })

export const patchSnippets = async (id: number, title: string, code: string) =>
    await fetch(`${API_URL}/snippets/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, code }),
    })

export const fetchSnippets = async () => await fetch(`${API_URL}/snippets`)

export const fetchSnippetsSingle = async (id: number) =>
    await fetch(`${API_URL}/snippets/${id}`)
