import { type Request, type Response } from 'express'
import { type UpdateSnippetRequestBody, type CreateSnippetRequestBody } from './snippets.schema.ts'
import {
    createSnippetsService,
    updateSnippetsService,
    fetchSnippetsService,
    fetchSnippetsSingleService
} from './snippets.service.ts'

export const createSnippetsHandler = async (
    req: Request<
        Record<string, never>,
        Record<string, never>,
        CreateSnippetRequestBody,
        Record<string, string[] | undefined>
    >,
    res: Response
): Promise<void> => {
    const { title, code } = req.body
    const { id } = res.locals.user as { id: number }

    const snippet = await createSnippetsService(id, title, code)

    res.status(200).json(snippet)
}
export const updateSnippetsHandler = async (
    req: Request<
        { snippetId: string },
        Record<string, never>,
        Record<string, never>,
        UpdateSnippetRequestBody,
        Record<string, string[] | undefined>
    >,
    res: Response
): Promise<void> => {
    const snippetId = Number(req.params.snippetId)
    const { title, code } = req.body
    const { id } = res.locals.user as { id: number }

    const snippet = await updateSnippetsService(id, snippetId, title, code)

    res.status(200).json(snippet)
}

export const fetchSnippetsHandler = async (_req: Request, res: Response) => {
    const snippets = await fetchSnippetsService()
    res.status(200).json(snippets)
}

export const fetchSnippetsSingleHandler = async (
    req: Request<{ snippetId: string }, Record<string, never>, Record<string, never>, Record<string, never>>,
    res: Response
) => {
    const snippet = await fetchSnippetsSingleService(Number(req.params.snippetId))
    res.status(200).json(snippet)
}
