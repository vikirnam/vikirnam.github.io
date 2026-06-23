export interface Project {
    id: string,
    name: string,
    title?: string,
    description: string,
    stack: string[], // TODO: stack as a list of string
    source: string,
    demo?: string,
}

export const projects: Project[] = [
    {
        id: 'overlayfs',
        name: 'OverlayFS',
        title: 'Implementing Read/Write Overlay Filessystem For Microkernel Based Operating System',
        description: ` A fully functional overlay filesystem scheme for RedoxOS — merging a writable upper layer
                    with a read-only lower layer into a single unified view. Written entirely in Rust, leveraging
                    memory-safety guarantees to eliminate use-after-free and data-race bugs at compile time.
                    Operates entirely in user-space as a native RedoxOS scheme, requiring zero kernel modifications.
        `,
        stack: ['rust'],
        source: 'https://gitlab.com/carboxide/overlayfs',
    },

    {
        id: '3o14',
        name: '3o14',
        title: 'A Decentralized Social Media For Scientific Communication',
        description: `A federated microblogging platform built on the W3C ActivityPub protocol, purpose-built
                    for researchers and academics. The platform enables seamless sharing of scientific content while maintaining interop-
                    erability with the broader Fediverse. Key features include support for scientific type-
                    setting, user-friendly server deployment, and the ability for institutions and individuals
                    to host their own instances without losing connectivity. By leveraging decentralization
                    and federation, this project provides a privacy-conscious, accessible, and academically
                    enriching alternative to existing platforms.`,
        stack: ['Typescript', 'React Native', 'Honojs', 'Postgresql'],
        source: 'https://github.com/3o14-com',
    },

    {
        id: 'tonica',
        name: 'TONICA',
        title: 'A UCI Chess Engine',
        description: `A UCI compatible chess engine written in Zig with support for core UCI commands, move generation, board evaluation, 
                    and game state management. Focused on low-level systems programming, engine architecture, and search logic 
                    while exploring performance-oriented design in Zig.`,
        stack: ['zig'],
        source: 'https://github.com/faultypointer/tonica',
    },
];