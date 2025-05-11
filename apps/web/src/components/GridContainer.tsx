export const GridContainer = ({ children }) => {
    return (
        <div className="grow grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-2">
            {children}
        </div>
    )
}
