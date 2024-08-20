'use server';

import { nanoid } from 'nanoid';
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";


// create Document
export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
    const roomId = nanoid();

    try {
        const metadata = {
            creatorId: userId,
            email,
            title: "Untitled"
        }

        const usersAccesses: RoomAccesses = {
            [email]: ['room:write']
        }

        const room = await liveblocks.createRoom(roomId, {
            metadata,
            usersAccesses,
            defaultAccesses: ['room:write'],
        });

        revalidatePath('/');

        return parseStringify(room);  //JSON.parse(JSON.stringify(room));

    } catch (error) {
        console.log(`Error happened while creating a room: ${error}`);
    }
}



// Get Document
export const getDocument = async ({ roomId, userId }: { roomId: string, userId: string }) => {
    try {
        const room = await liveblocks.getRoom(roomId);

        // TODO: Update soon

        // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

        // if (!hasAccess) {
        //     throw new Error('You do not have access to this document');
        // }

        return parseStringify(room);

    } catch (error) {
        console.log(`Error happened while getting a room: ${error}`);
    }
}



// Update Document
export const updateDocument = async (roomId: string, title: string) => {
    try {
        const updatedRoom = await liveblocks.updateRoom(roomId, {
            metadata: {
                title,
            }
        });

        revalidatePath(`/documents/${roomId}`);

        return parseStringify(updatedRoom);

    } catch (error) {
        console.log(`Error happened while updating a room: ${error}`);
    }
}



// Get All Documents
export const getDocuments = async (email: string) => {
    try {
        const room = await liveblocks.getRooms({ userId: email });

        return parseStringify(room);

    } catch (error) {
        console.log(`Error happened while getting all rooms: ${error}`);
    }
}



// 