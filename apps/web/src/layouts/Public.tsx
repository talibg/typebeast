import { Outlet, useNavigation } from 'react-router'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Loading } from '../components/Loading'

export const Public = () => {
    const navigation = useNavigation()
    const isNavigating = Boolean(navigation.location)

    return (
        <>
            <Header />
            {isNavigating && <Loading />}
            {!isNavigating && <Outlet />}
            <Footer />
        </>
    )
}
