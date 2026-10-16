import { portfolioDataText } from './portfolioDataText.js';
import profileImage from '../assets/profile.jpeg';
import profileNoHat from '../assets/profile-no-hat.jpeg';
import profileAnimation from '../assets/profile-animation.mp4';
import profileAnimation2 from '../assets/profile-animation-2.mp4';
import samBookingWorkflow from '../assets/sam-booking-workflow.png';
import zalioMarketingScout from '../assets/zalio-marketing-scout.png';
import zalioMarketingDiscover from '../assets/zalio-marketing-discover.png';
import zalioMarketingNewsroom from '../assets/zalio-marketing-newsroom.png';
import zalioMarketingStoryDetail from '../assets/zalio-marketing-story-detail.png';
import zalioMarketingCreativeStudio from '../assets/zalio-marketing-creative-studio.png';
import zalioMarketingLinks from '../assets/zalio-marketing-links.png';

const projectOutputs = {
  'Zalio Marketing — AI Marketing Studio': [
    {
      title: 'Scout',
      caption: 'Trend monitoring workspace with platform tabs and breakout tracking; this sample account has no tracked creators or breakouts yet.',
      image: zalioMarketingScout,
      alt: 'Scout trend monitoring dashboard with platform tabs, creator ranking, and breakout tracking panels. The sample account shows zero tracked creators and no breakouts.'
    },
    {
      title: 'Discover',
      caption: 'Instagram and TikTok content-search interface.',
      image: zalioMarketingDiscover,
      alt: 'Discover search screen with Instagram and TikTok source options, suggested search topics, and an empty trending feed. YouTube Shorts is shown as an upcoming source.'
    },
    {
      title: 'Newsroom',
      caption: 'Newsroom preview with sample data.',
      image: zalioMarketingNewsroom,
      alt: 'Zalio Marketing newsroom interface showing All news with 16 sample stories, topic filters, relevance sorting, a search field, and a grid of AI, technology, and science story cards.'
    },
    {
      title: 'Story detail',
      caption: 'Story packet with a summary and grouped source articles (sample data).',
      image: zalioMarketingStoryDetail,
      alt: 'Newsroom story detail for an Anthropic article, with three source articles, a summary, gist bullets, and media from the sources.'
    },
    {
      title: 'Creative Studio',
      caption: 'Editor workspace with the timeline, media panel, and inspector.',
      image: zalioMarketingCreativeStudio,
      alt: 'Creative Studio empty editing workspace showing the AI editor, a media panel, an empty timeline, and an inspector waiting for a clip selection.'
    },
    {
      title: 'Links',
      caption: 'Editor with profile and theme controls beside a mobile preview populated with a sample profile.',
      image: zalioMarketingLinks,
      alt: 'Links editor showing profile fields, social link rows, theme controls, and a live mobile preview of a sample profile.'
    }
  ],
  'SAM — Service Automation Manager': [
    {
      title: 'n8n booking workflow',
      caption: 'The booking flow behind SAM: an AI agent checks the request, records confirmed bookings, creates a Calendar event, and sends a Telegram notification.',
      image: samBookingWorkflow,
      alt: 'n8n booking flow diagram: a webhook passes a request through Google Sheets and an AI agent, then branches to log a confirmed booking, create a Calendar event, and send a Telegram message, or return a chat response.'
    }
  ]
};

export const portfolioData = {
  ...portfolioDataText,
  projects: portfolioDataText.projects.map((project) => {
    const outputs = projectOutputs[project.name];
    return outputs ? { ...project, outputs } : project;
  }),
  identity: {
    ...portfolioDataText.identity,
    profilePicture: profileImage,
    profileNoHat: profileNoHat,
    profileAnimation: profileAnimation2,
    profileAnimation2: profileAnimation,
  }
};
