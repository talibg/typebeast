import database from '@typebeast/database'

export const createSnippetsService = async (userId: number, title: string, code: string) => {
    const snippet = database.snippet.create({ data: { userId, title, code } })
    return snippet
}

export const updateSnippetsService = async (userId: number, snippetId: number, title: string, code: string) => {
    const snippet = database.snippet.update({
        where: { id: snippetId, userId },
        data: {
            title,
            code
        }
    })
    return snippet
}

export const deleteSnippetsService = async (userId: number, snippetId: number) => {
    const snippet = database.snippet.delete({
        where: { id: snippetId, userId }
    })
    return snippet
}

export const fetchSnippetsService = async () => {
    const snippets = await database.snippet.findMany({
        include: {
            user: { select: { username: true } }
        }
    })
    return snippets
}

export const fetchSnippetsSingleService = async (id: number) => {
    const snippets = await database.snippet.findFirst({
        where: { id },
        include: {
            user: { select: { username: true } }
        }
    })

    return snippets
}
