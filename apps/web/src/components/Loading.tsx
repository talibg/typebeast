import { Timer } from 'lucide-react'

export const Loading = () => {
    return (
        <div className="w-full flex-auto grow flex flex-col justify-center items-center content-center px-8">
            <Timer className="h-[100px] w-[100px]" />
        </div>
    )
}
