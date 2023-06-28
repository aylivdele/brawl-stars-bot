import {ClubMembersList} from "../types/BrawlStarsAPIModel";
import axios, {AxiosResponse} from "axios";

//const fetch = (url: RequestInfo, init?: RequestInit) =>  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

const BASE_URL = 'https://api.brawlstars.com/v1/';

const config = {
    headers: { Authorization: `Bearer ${process.env.BRAWL_API_TOKEN}` }
};

const axiosInstance = axios.create({ baseURL: BASE_URL, ...config });

    /*.then(json => {
        console.log(`brawlApi result path: ${ path }, body: ${ JSON.stringify(body) }, result: ${ JSON.stringify(json) }`);
        return json;
    })
    .catch(error => {
        console.error(`brawlApi error path: ${ path }, body: ${ JSON.stringify(body) }`)
        console.error(error);
        return undefined;
    });*/

const onResolve = (value: AxiosResponse) => {
    console.log(JSON.stringify(value));
    return (value.status >= 200 && value.status < 300) ? value.data : undefined;
}

const onReject = (reason: any) => {
    console.error(reason);
    return undefined;
}

export const brawlApi = {
    getClubMembers: (clubTag?: string) : Promise<ClubMembersList | undefined> => {
        return axiosInstance.get(`clubs/${encodeURIComponent(clubTag ?? process.env.BRAWL_CLUB_TAG as string)}/members`)
            .then(onResolve)
            .catch(onReject);
    }
}