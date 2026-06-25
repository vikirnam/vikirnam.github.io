export interface Link {
    url: string,
    title: string,
    author?: string,
    description?: string,
}

export const links: Link[] = [
    {
        url: 'https://refactoringenglish.com/excerpts/write-an-effective-design-doc/',
        title: 'How to Write an Effective Software Design Document',
        author: 'Michael Lynch',
    },
];