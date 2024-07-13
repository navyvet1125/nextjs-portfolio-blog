// import { DateTime } from "next-auth/providers/kakao";

export interface Comment {
    id: string;
    text: string;
    author: {
        name: string;
        email: string;
    }
    createdAt: Date
}