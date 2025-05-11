export const FlexContainer = ({ children }) => {
    return (
        <div className="w-full flex-auto grow flex flex-col p-4">
            {children}
        </div>
    )
}
