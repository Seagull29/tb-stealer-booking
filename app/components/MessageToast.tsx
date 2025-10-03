import { Transition } from "@headlessui/react";
import { BadgeInfoIcon } from "lucide-react";

interface Props {
    show: boolean;
    position: "top" | "bottom";
    children?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}

export default function MessageToast({ show, position, children, icon, className }: Props) {
    const startPosition: string = position === "top" ? "data-[closed]:-translate-y-full" : "data-[closed]:translate-y-full";
    return (
        <Transition show={show} appear={true}>
            <section className={`transition-all duration-500 scale-100 translate-y-0 overflow-hidden ease-in-out data-[closed]:opacity-0 ${startPosition} data-[closed]:scale-0 px-3 py-4 border-l-4 bg-catppuccin-latte-sky rounded-r rounded-l-sm shadow-lg drop-shadow-md flex items-center gap-4 text-sm ${className ? className : "border-ctp-frappe-blue "}`}>
                <div>
                    {
                        icon ? icon : <BadgeInfoIcon className="size-6 " />
                    }
                </div>
                <article>
                    {children}
                </article>
            </section>
        </Transition>
    );
}