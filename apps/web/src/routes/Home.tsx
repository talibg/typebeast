import { useLoaderData } from 'react-router'
import { SnippetCard } from '@/components/SnippetCard'
import { GridContainer } from '../components/GridContainer'
import { PowerOn } from '../components/PowerOn'

export type Snippet = {
    id: number
    code: string
    title: string
    user: { username: string }
}

export const Home = () => {
    const data = useLoaderData<Snippet[]>()

    return data.length ? (
        <GridContainer>
            {data.map(({ id, code, title, user: { username } }) => (
                <SnippetCard
                    key={id}
                    id={id}
                    code={code}
                    title={title}
                    username={username}
                />
            ))}
        </GridContainer>
    ) : (
        <PowerOn />
    )
}
