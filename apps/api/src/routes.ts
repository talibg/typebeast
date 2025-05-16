import { Router } from 'express'
import { requireAuth } from './middleware/require-auth.ts'
import { validateSchema } from './middleware/validate-schema.ts'
import {
    createSessionHandler,
    deleteSessionHandler,
    fetchSessionHandler
} from './resources/sessions/sessions.handler.ts'
import { createSessionSchema } from './resources/sessions/sessions.schema.ts'
import {
    createSnippetsHandler,
    updateSnippetsHandler,
    deleteSnippetsHandler,
    fetchSnippetsHandler,
    fetchSnippetsSingleHandler
} from './resources/snippets/snippets.handler.ts'
import { createSnippetSchema } from './resources/snippets/snippets.schema.ts'
import { createUserHandler, fetchUserHandler } from './resources/users/users.handler.ts'
import { createUserSchema } from './resources/users/users.schema.ts'

const router = Router() as Router

router.post('/users', validateSchema(createUserSchema), createUserHandler)
router.post('/sessions', validateSchema(createSessionSchema), createSessionHandler)

router.get('/sessions', fetchSessionHandler)
router.get('/snippets/:snippetId', fetchSnippetsSingleHandler)
router.get('/snippets', fetchSnippetsHandler)

router.get('/users', requireAuth, fetchUserHandler)
router.delete('/sessions', requireAuth, deleteSessionHandler)

router.post('/snippets', requireAuth, validateSchema(createSnippetSchema), createSnippetsHandler)
router.patch('/snippets/:snippetId', requireAuth, validateSchema(createSnippetSchema), updateSnippetsHandler)
router.delete('/snippets/:snippetId', requireAuth, deleteSnippetsHandler)

export { router }
