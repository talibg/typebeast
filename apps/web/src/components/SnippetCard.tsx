import Editor from '@monaco-editor/react'
import { NavLink, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import { Edit, Expand, Eye, Shrink, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export const SnippetCard = ({
    id,
    userId,
    code,
    title,
    username,
}: {
    id: number
    userId: number
    code: string
    title: string
    username: string
}) => {
    const { snippetId } = useParams()
    const { user } = useAuth()
    return (
        <Card
            key={id}
            className={
                snippetId
                    ? 'w-full w-1/2 max-w-[1024px] p-4 h-[768px] mx-auto mt-8'
                    : 'py-2 h-[460px]'
            }>
            <CardHeader className="p-0">
                <div className="flex justify-between px-4">
                    <div>
                        <CardTitle className="text-xl">{title}</CardTitle>
                        <CardDescription>
                            {username}
                            {user && user.id === userId ? (
                                <small className="pl-2">You</small>
                            ) : null}
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        {user && user.id === userId ? (
                            <Button asChild>
                                <NavLink to={`/${id}/edit`}>
                                    <Edit />
                                </NavLink>
                            </Button>
                        ) : null}
                        <Button asChild>
                            {snippetId ? (
                                <NavLink to={`/`}>
                                    <X />
                                </NavLink>
                            ) : (
                                <NavLink to={`${id}`}>
                                    <Eye />
                                </NavLink>
                            )}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 h-full">
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    language="typescript"
                    theme="vs-dark"
                    options={{
                        contextmenu: false,
                        scrollBeyondLastLine: false,
                        minimap: { enabled: false },
                        readOnly: true,
                        lineNumbersMinChars: 3,
                        lineDecorationsWidth: 5,
                        folding: false,
                        showFoldingControls: 'never',
                        wordWrap: 'wordWrapColumn',
                        wordWrapColumn: 80,
                        fontSize: snippetId ? 16 : 13,
                        padding: { top: 4 },
                    }}
                    value={code}
                />
            </CardContent>
        </Card>
    )
}
