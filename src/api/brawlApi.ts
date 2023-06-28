import {ClubMembersList} from "../types/BrawlStarsAPIModel";
import { RequestInfo, RequestInit } from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

const BASE_URL = 'https://api.brawlstars.com/v1/';
const fetchApi = (path: string, body?: any) : Promise<any> => fetch(
    BASE_URL + path,
    {
        headers: { Authentication: `Bearer ${process.env.BRAWL_API_TOKEN}`, Accept: 'application/json'},
        method: body ? 'POST' : 'GET',
        body: body ? JSON.stringify(body) : undefined,
    })
    .then(response => response.json())
    .catch(error => {
        console.error(`brawlApi error path: ${ path }, body: ${ JSON.stringify(body) }`)
        console.error(error);
        return undefined;
    });

export const brawlApi = {
    getClubMembers: (clubTag?: string) : Promise<ClubMembersList> => {
        return fetchApi(`clubs/${encodeURIComponent(clubTag ?? process.env.BRAWL_CLUB_TAG as string)}/members`);
    }
}