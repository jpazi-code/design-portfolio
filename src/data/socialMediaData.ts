import { GalleryItem } from '../components/Gallery';

export interface SocialMediaProfile {
  id: number;
  name: string;
  description: string;
  profilePic: string;
  posts: number;
  followers: number;
  following?: number;
  slug: string;
}

export interface SocialMediaPost {
  id: number;
  imageSrc: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
}

// Social Media Profiles
export const socialMediaProfiles: SocialMediaProfile[] = [
  {
    id: 1,
    name: 'RetroBites',
    description: 'your one stop resto for a bite!',
    profilePic: '/socmed/retrobites/profilepic/retrobiteslogo.png',
    posts: 8,
    followers: 300,
    following: 2,
    slug: 'retrobites'
  },
  {
    id: 2,
    name: 'Just Keep Swimming',
    description: 'Just Keep Swimming is a campaign that aims to shed light on 3 endangered animals and their habitats.',
    profilePic: '/socmed/justkeepswimming/profilepic/jkslogo.jpg',
    posts: 12,
    followers: 5700,
    following: 45,
    slug: 'justkeepswimming'
  },
  {
    id: 3,
    name: 'SoleFest',
    description: 'The ultimate sneaker convention for collectors and enthusiasts!',
    profilePic: '/socmed/solefest/profilepic/solefestlogo.png',
    posts: 9,
    followers: 1240,
    following: 108,
    slug: 'solefest'
  }
];

// RetroBytes Posts
export const retroBitesPosts: SocialMediaPost[] = [
  {
    id: 1,
    imageSrc: '/socmed/retrobites/rgrab.jpg',
    caption: 'Grab your retro favorites today! #retroburger #foodie',
    likes: 221,
    comments: 2,
    date: '21H AGO'
  },
  {
    id: 2,
    imageSrc: '/socmed/retrobites/duodelight.jpg',
    caption: 'Duo Delight - perfect for sharing! #retrocombo #foodie',
    likes: 186,
    comments: 5,
    date: '1D AGO'
  },
  {
    id: 3,
    imageSrc: '/socmed/retrobites/free2dips.jpg',
    caption: 'Free 2 dips with every large order! #offer #foodie',
    likes: 203,
    comments: 8,
    date: '2D AGO'
  },
  {
    id: 4,
    imageSrc: '/socmed/retrobites/1111deals.jpg',
    caption: '11.11 special deals all day! #discount #foodie',
    likes: 189,
    comments: 3,
    date: '4D AGO'
  },
  {
    id: 5,
    imageSrc: '/socmed/retrobites/opennow.jpg',
    caption: 'We are now open at Downtown Foodie District! #newlocation #foodie',
    likes: 245,
    comments: 12,
    date: '1W AGO'
  },
  {
    id: 6,
    imageSrc: '/socmed/retrobites/1daytogo.jpg',
    caption: '1 day to go until our grand opening! #comingsoon #foodie',
    likes: 178,
    comments: 7,
    date: '1W AGO'
  },
  {
    id: 7,
    imageSrc: '/socmed/retrobites/2daystogo.jpg',
    caption: '2 days to go until our grand opening! #comingsoon #foodie',
    likes: 156,
    comments: 4,
    date: '1W AGO'
  },
  {
    id: 8,
    imageSrc: '/socmed/retrobites/3daystogo.jpg',
    caption: '3 days to go until our grand opening! #comingsoon #foodie',
    likes: 142,
    comments: 2,
    date: '1W AGO'
  }
];

// Just Keep Swimming Posts
export const justKeepSwimmingPosts: SocialMediaPost[] = [
  {
    id: 1,
    imageSrc: '/socmed/justkeepswimming/jks (1).jpg',
    caption: 'Help us protect endangered marine species! #savetheocean #conservation',
    likes: 428,
    comments: 15,
    date: '6H AGO'
  },
  {
    id: 2,
    imageSrc: '/socmed/justkeepswimming/jks (2).jpg',
    caption: 'Sea turtles need our help to survive. #seaturtles #endangered',
    likes: 356,
    comments: 12,
    date: '1D AGO'
  },
  {
    id: 3,
    imageSrc: '/socmed/justkeepswimming/jks (3).jpg',
    caption: 'Coral reefs are dying at an alarming rate. #coralreef #climatechange',
    likes: 382,
    comments: 21,
    date: '2D AGO'
  },
  {
    id: 4,
    imageSrc: '/socmed/justkeepswimming/jks (4).jpg',
    caption: 'Blue whales are the largest animals to ever exist on Earth. #bluewhale #conservation',
    likes: 412,
    comments: 18,
    date: '3D AGO'
  },
  {
    id: 5,
    imageSrc: '/socmed/justkeepswimming/jks (5).jpg',
    caption: 'Plastic pollution is killing our oceans. #plasticfree #savetheocean',
    likes: 395,
    comments: 24,
    date: '4D AGO'
  },
  {
    id: 6,
    imageSrc: '/socmed/justkeepswimming/jks (6).jpg',
    caption: 'Join our beach cleanup next Saturday! #beachcleanup #volunteer',
    likes: 287,
    comments: 32,
    date: '5D AGO'
  },
  {
    id: 7,
    imageSrc: '/socmed/justkeepswimming/jks (7).jpg',
    caption: 'Dolphins are among the most intelligent animals on Earth. #dolphins #marinelife',
    likes: 368,
    comments: 14,
    date: '6D AGO'
  },
  {
    id: 8,
    imageSrc: '/socmed/justkeepswimming/jks (8).jpg',
    caption: 'Our oceans need our help now more than ever. #oceanconservation #climateaction',
    likes: 405,
    comments: 27,
    date: '1W AGO'
  },
  {
    id: 9,
    imageSrc: '/socmed/justkeepswimming/jks (9).jpg',
    caption: 'Small actions can make a big difference. #sustainable #ecofriendly',
    likes: 342,
    comments: 19,
    date: '1W AGO'
  },
  {
    id: 10,
    imageSrc: '/socmed/justkeepswimming/jks (10).jpg',
    caption: 'Shark populations have declined by over 70% in the last 50 years. #savethesharks #conservation',
    likes: 376,
    comments: 22,
    date: '1W AGO'
  },
  {
    id: 11,
    imageSrc: '/socmed/justkeepswimming/jks (11).jpg',
    caption: 'Education is key to conservation. Share this post! #awareness #education',
    likes: 315,
    comments: 16,
    date: '2W AGO'
  },
  {
    id: 12,
    imageSrc: '/socmed/justkeepswimming/jks (12).jpg',
    caption: 'Every donation helps us protect marine life. #donate #makeadifference',
    likes: 298,
    comments: 11,
    date: '2W AGO'
  }
];

// SoleFest Posts
export const soleFestPosts: SocialMediaPost[] = [
  {
    id: 1,
    imageSrc: '/socmed/solefest/whatwhen.jpg',
    caption: 'SoleFest 2023: Mark your calendars! #sneakercon #solefest',
    likes: 421,
    comments: 18,
    date: '2D AGO'
  },
  {
    id: 2,
    imageSrc: '/socmed/solefest/laceup.jpg',
    caption: 'Lace up and get ready for the biggest sneaker event of the year! #sneakerhead #solefest',
    likes: 386,
    comments: 14,
    date: '3D AGO'
  },
  {
    id: 3,
    imageSrc: '/socmed/solefest/5daystogo2.jpg',
    caption: '5 days to go until SoleFest! #countdown #sneakers',
    likes: 312,
    comments: 9,
    date: '5D AGO'
  },
  {
    id: 4,
    imageSrc: '/socmed/solefest/discount.jpg',
    caption: 'Early bird tickets now 20% off! Limited time offer. #earlybird #discount',
    likes: 356,
    comments: 24,
    date: '1W AGO'
  },
  {
    id: 5,
    imageSrc: '/socmed/solefest/solefest.jpg',
    caption: 'SoleFest: Where sneaker culture comes alive! #sneakerculture #convention',
    likes: 405,
    comments: 17,
    date: '1W AGO'
  },
  {
    id: 6,
    imageSrc: '/socmed/solefest/3daystogo2.jpg',
    caption: 'Just 3 days to go! Who\'s excited? #hype #sneakercon',
    likes: 342,
    comments: 21,
    date: '1W AGO'
  },
  {
    id: 7,
    imageSrc: '/socmed/solefest/thebrands.jpg',
    caption: 'Check out the amazing brands joining us this year! #brands #collaboration',
    likes: 378,
    comments: 13,
    date: '2W AGO'
  },
  {
    id: 8,
    imageSrc: '/socmed/solefest/brandstoexpect.jpg',
    caption: 'More brands to be announced soon! Stay tuned. #sneakerreleases #exclusive',
    likes: 325,
    comments: 11,
    date: '2W AGO'
  },
  {
    id: 9,
    imageSrc: '/socmed/solefest/buynow.jpg',
    caption: 'Tickets selling fast! Get yours now before they\'re gone. #tickets #buynow',
    likes: 297,
    comments: 16,
    date: '2W AGO'
  }
];

// Map profile slugs to their respective posts
export const profilePostsMap: Record<string, SocialMediaPost[]> = {
  'retrobites': retroBitesPosts,
  'justkeepswimming': justKeepSwimmingPosts,
  'solefest': soleFestPosts
}; 