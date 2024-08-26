'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useInboxNotifications, useUnreadInboxNotificationsCount } from "@liveblocks/react/suspense"
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui"
import Image from "next/image"
import { ReactNode } from "react"

const Notifications = () => {
    const { inboxNotifications } = useInboxNotifications();
    const { count } = useUnreadInboxNotificationsCount();

    const unreadNotifications = inboxNotifications.filter((notification) => !notification.readAt);

    return (
        <Popover>
            <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
                <Image
                    src="/assets/icons/bell.svg"
                    alt="inbox"
                    width={24}
                    height={24}
                />
                {count > 0 && (
                    <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500"></div>
                )}
            </PopoverTrigger>
            <PopoverContent align="end" className="shad-popover">
                <LiveblocksUIConfig
                    overrides={{
                        INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
                            <>
                                {user} mentioned you.
                            </>
                        )
                    }}
                >
                    <InboxNotificationList>





                    </InboxNotificationList>
                </LiveblocksUIConfig>
            </PopoverContent>
        </Popover>

    );
}

export default Notifications