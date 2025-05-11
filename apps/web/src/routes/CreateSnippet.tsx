import Editor from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Rocket } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { postSnippets } from '../api/api'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { FlexContainer } from '../components/FlexContainer'

export const CreateSnippet = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')

    const onSubmitSnippet = async () => {
        const response = await postSnippets(title, code)
        const data = await response.json()
        toast('Snippet Created')
        navigate(`/${data.id}`)
    }

    return (
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
                        <Button onClick={onSubmitSnippet}>
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
