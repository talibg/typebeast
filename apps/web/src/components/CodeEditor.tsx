import Editor from '@monaco-editor/react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Save } from 'lucide-react'
import { Input } from './ui/input'

export const CodeEditor = () => {
    return (
        <div className="h-full max-h-full w-full">
            <Card className="w-full max-w-[768px] m-auto mt-8 p-4">
                <CardHeader>
                    <div className="flex between">
                        <CardTitle>
                            <Input placeholder="untitled" />
                        </CardTitle>
                        <Button>
                            <Save />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="h-[500px] p-0">
                    <Editor
                        className="rounded-2xl"
                        height="100%"
                        defaultLanguage="javascript"
                        defaultValue="// some comment"
                        language="typescript"
                        theme="vs-dark"
                        options={{
                            contextmenu: false,
                            scrollBeyondLastLine: false,
                            minimap: { enabled: false },
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
