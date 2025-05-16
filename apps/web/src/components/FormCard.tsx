import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import React from 'react'

export const FormCard = ({
    title,
    description,
    children,
    ...props
}: {
    title: string
    description: string
} & React.PropsWithChildren) => (
    <Card className="mx-auto w-full max-w-[500px]" {...props}>
        <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
)
