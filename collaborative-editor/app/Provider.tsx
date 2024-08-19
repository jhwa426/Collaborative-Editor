"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            <RoomProvider id="my-room">
                <ClientSideSuspense fallback={<Loader />}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}

export default Provider;