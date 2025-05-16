import Editor from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Rocket } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { patchSnippets } from '../api/api'
import { Navigate, useLoaderData, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { FlexContainer } from '../components/FlexContainer'
import { useAuth } from '../hooks/useAuth'

export const EditSnippet = () => {
    const data = useLoaderData()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [title, setTitle] = useState(data.title)
    const [code, setCode] = useState(data.code)

    const onSubmitSnippet = async (id: number) => {
        const response = await patchSnippets(id, title, code)
        const data = await response.json()
        toast('Snippet Updated')
        navigate(`/${data.id}`)
    }

    return !user || user.id !== data.userId ? (
        <Navigate to={`/${data.id}`} />
    ) : (
        <FlexContainer>
            <Card
                className={
                    'w-full w-1/2 max-w-[1024px] p-4 h-[768px] mx-auto mt-8'
                }>
                <CardHeader className="p-0">
                    <div className="flex justify-between px-4">
                        <CardTitle>
                            <Input
                                placeholder="untitled"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </CardTitle>
                        <Button onClick={() => onSubmitSnippet(data.id)}>
                            <Rocket />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0 h-full">
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        language="typescript"
                        defaultValue="// Your Awsome Typescript Snippet.."
                        theme="vs-dark"
                        options={{
                            contextmenu: false,
                            scrollBeyondLastLine: false,
                            minimap: { enabled: false },
                            lineNumbersMinChars: 3,
                            lineDecorationsWidth: 5,
                            folding: false,
                            showFoldingControls: 'never',
                            wordWrap: 'wordWrapColumn',
                            wordWrapColumn: 80,
                            fontSize: 16,
                            padding: { top: 4 },
                        }}
                        value={code}
                        onChange={(value) => setCode(value!)}
                    />
                </CardContent>
            </Card>
        </FlexContainer>
    )
}
