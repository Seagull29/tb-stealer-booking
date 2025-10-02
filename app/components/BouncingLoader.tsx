interface Props {
    children?: React.ReactNode;
    className?: string;
}

// ** bg-white size-*
export default function BouncingLoader({ className, children }: Props) {
    return (
        <div className="h-full flex flex-col justify-center items-center py-0.5">
            <div className="flex gap-3">
                <div className={`${className} rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
                <div className={`${className} rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
                <div className={`${className} rounded-full animate-bounce`}></div>
            </div>
            {children}
        </div>
    );
}