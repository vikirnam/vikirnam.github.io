import profile from '../images/profile.jpg';

export const typeConfig: Record<TimelineItem["type"], { label: string; color: string }> = {
    life:       { label: "Life",       color: "#D85A30" },
    education:  { label: "Education",  color: "#4F46E5" },
    experience: { label: "Experience", color: "#059669" },
    trip:       { label: "Trip",       color: "#D97706" },
    event:      { label: "Event",      color: "#7C3AED" },
    extras:     { label: "Extras",     color: "#6B7280" },
};

export interface TimelineItem {
    title: string,
    date: Date,
    description: string,
    type: 'life' | 'education' | 'experience' | 'trip' | 'event' | 'extras',
    images: ImageMetadata[],
}

export const timelineData: TimelineItem[] = [
    {
        title: 'The Journey Begins',
        date: new Date('2003-09-15'),
        description: 'A major milestone that marked the beginning of conscious memories and early exploration. This period was filled with intense curiosity about how things worked, countless hours spent dismantling household toys, and an early fascination with drawing and storytelling that laid the foundation for future creative endeavors.',
        type: 'life',
        images: [profile, profile, profile]
    },
    {
        title: 'First Day of Elementary School',
        date: new Date('2006-08-22'),
        description: 'Stepping into a larger world of structured learning and social interaction. It was a daunting shift from the freedom of early childhood, but it quickly became an arena for discovering a love for reading and basic mathematics. This year set off a decade-long academic journey full of challenges, group projects, and lifelong friendships.',
        type: 'education',
        images: [profile, profile, profile, profile]
    },
    {
        title: 'Family Road Trip Across the Coast',
        date: new Date('2010-07-12'),
        description: 'An unforgettable summer vacation spent traveling down the coast. Packed into a crowded car with endless playlists, we visited historical landmarks, camped under the stars, and saw the ocean in a way that sparked a permanent love for traveling and discovering new geographical landscapes.',
        type: 'trip',
        images: [profile, profile, profile, profile, profile]
    },
    {
        title: 'Discovering the World of Programming',
        date: new Date('2014-11-05'),
        description: 'While looking for ways to automate boring tasks on my computer, I stumbled upon programming. Writing my very first "Hello World" program in a messy text editor was an eye-opening experience. The realization that I could build functional tools out of pure logic completely shifted my focus and hobbies from that moment forward.',
        type: 'extras',
        images: [profile, profile, profile]
    },
    {
        title: 'Entering High School Academy',
        date: new Date('2016-09-01'),
        description: 'A major transitional phase focusing heavily on advanced sciences and digital technology. Navigating the crowded hallways, balancing a heavier homework load, and joining the local robotics club took up most of my waking hours. It was a rigorous environment that forced me to learn time management and collaboration early on.',
        type: 'education',
        images: [profile, profile, profile, profile]
    },
    {
        title: 'Winning the Regional Science Fair',
        date: new Date('2018-04-18'),
        description: 'After months of sleepless nights, troubleshooting hardware issues, and rewriting software code, our team took home the first-place trophy at the regional tech exposition. Presenting our project to a panel of industry experts taught me how to communicate complex technical ideas to a non-technical audience.',
        type: 'event',
        images: [profile, profile, profile, profile, profile]
    },
    {
        title: 'First Freelance Web Development Gig',
        date: new Date('2020-05-20'),
        description: 'Secured my first official commercial project building a custom e-commerce landing page for a local small business. Managing client expectations, handling shifting requirements, and figuring out deployment pipelines on my own was a steep learning curve, but earning that first paycheck entirely through code felt incredible.',
        type: 'experience',
        images: [profile, profile, profile]
    },
    {
        title: 'Moving to a New City for University',
        date: new Date('2021-08-28'),
        description: 'Packed everything I owned into three suitcases and moved halfway across the country to pursue a higher degree. Adapting to independent living, managing a tight budget, and learning to navigate an unfamiliar transit system was a massive leap out of my comfort zone, defining a brand new chapter of personal growth.',
        type: 'life',
        images: [profile, profile, profile, profile]
    },
    {
        title: 'Summer Internship at Tech Corp',
        date: new Date('2023-06-01'),
        description: 'Joined an agile software engineering team as a front-end intern. Spent three months working closely with senior developers, participating in daily standups, and contributing production-ready code to a legacy codebase. This experience demystified how large-scale enterprise applications are actually built and deployed.',
        type: 'experience',
        images: [profile, profile, profile, profile, profile]
    },
    {
        title: 'Backpacking Through Europe',
        date: new Date('2024-07-15'),
        description: 'Saved up for over a year to fund a solo backpacking trip across multiple historic cities. From navigating ancient cobblestone streets to trying incredible local cuisines and meeting fellow travelers from all walks of life, this journey expanded my global perspective and provided a much-needed creative reset.',
        type: 'trip',
        images: [profile, profile, profile]
    },
    {
        title: 'Graduation Day',
        date: new Date('2025-05-18'),
        description: 'Walking across the stage to receive my degree felt entirely surreal. Looking back at the endless nights spent studying in the library, the countless cups of coffee, and the incredible network of peers and professors, it felt like the perfect culmination of years of hard work and dedication to the craft.',
        type: 'education',
        images: [profile, profile, profile, profile]
    },
    {
        title: 'Trying To Add Timeline In Portfolio Site',
        date: new Date('2026-06-27'),
        description: 'I have had this idea for weeks now and finally thought it was time to bring it to life. Building a chronological narrative of my journey not only serves as a great visual portfolio feature but also gives me a moment to reflect on how far I have come over the years. Excited to see how this turns out!',
        type: 'extras',
        images: [profile, profile, profile, profile, profile]
    }
];