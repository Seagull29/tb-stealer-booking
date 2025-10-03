import MessageToast from "@/components/MessageToast";
import { XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { type FetcherWithComponents } from "react-router";

export function useDisplayResponseToast(fetcher?: FetcherWithComponents<any>) {
    const previousStateRef = useRef(fetcher?.state);
    useEffect(() => {
        // const hastJustCompleted = previousStateRef.current !== "idle" && fetcher?.state === "idle";
        if (fetcher?.data?.error) {
            toast.custom(t => (
                <MessageToast position="top" show={t.visible} className="bg-red-100 border-red-700 text-red-900 ring-1 ring-red-800/15 shadow-lg shadow-red-700/30">
                    <p className="">{fetcher.data?.error}</p>
                </MessageToast>
            ), {
                position: "top-center",
                duration: 2500,
            });
            return;
        }
        if (fetcher?.data?.message) {
            toast.custom(t => (
                <MessageToast position="top" show={t.visible} className="bg-green-100 border-green-700 text-green-900 ring-1 ring-green-800/15 shadow-lg shadow-green-700/30">
                    <p className="">{fetcher.data?.message}</p>
                </MessageToast>
            ), {
                position: "top-center",
                duration: 2500,
            });
        }
        previousStateRef.current = fetcher?.state
    }, [fetcher?.data]);

    const triggerToast = (message: string, closable?: boolean, isError?: boolean) => {
        toast.custom(t => !isError ? (
            <MessageToast position="top" show={t.visible} className="bg-green-100 border-green-700 text-green-900 ring-1 ring-green-800/15 shadow-lg shadow-green-700/30">
                <p className="">{message}</p>
                {
                    closable &&
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 cursor-pointer" onClick={() => toast.dismiss(t.id)}>
                        <XIcon className="size-4" />
                    </button>
                }
            </MessageToast>
        ) :
            <MessageToast position="top" show={t.visible} className="bg-red-100 border-red-700 text-red-900 ring-1 ring-red-800/15 shadow-lg shadow-red-700/30">
                <p className="">{message}</p>
                {
                    closable &&
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 cursor-pointer" onClick={() => toast.dismiss(t.id)}>
                        <XIcon className="size-4" />
                    </button>
                }
            </MessageToast>
            , {
                position: "top-center",
                duration: closable ? Infinity : 2500,
            });
    }

    return triggerToast;
}