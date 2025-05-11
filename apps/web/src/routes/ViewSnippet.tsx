import { useLoaderData } from 'react-router'
import { SnippetCard } from '../components/SnippetCard'
import { type Snippet } from './Home'
import { FlexContainer } from '../components/FlexContainer'

export const ViewSnippet = () => {
    const {
        id,
        code,
        title,
        user: { username },
    } = useLoaderData<Snippet>()

    return (
        <FlexContainer>
            <SnippetCard
                id={id}
                code={code}
                title={title}
                username={username}
            />
        </FlexContainer>
    )
}
