
export enum ClubRole {
    NOT_MEMBER = 'notMember',
    MEMBER = 'member',
    PRESIDENT = 'president',
    SENIOR = 'senior',
    VICE_PRESIDENT = 'vicePresident',
    UNKNOWN = 'unknown',
}
export interface ClubMember {
    tag: string;
    name: string;
    trophies: number;
    role: ClubRole;
}

export type ClubMembersList = ClubMember[];
