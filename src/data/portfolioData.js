import { portfolioDataText } from './portfolioDataText.js';
import profileImage from '../assets/profile.jpeg';
import profileNoHat from '../assets/profile-no-hat.jpeg';
import profileAnimation from '../assets/profile-animation.mp4';
import profileAnimation2 from '../assets/profile-animation-2.mp4';

export const portfolioData = {
  ...portfolioDataText,
  identity: {
    ...portfolioDataText.identity,
    profilePicture: profileImage,
    profileNoHat: profileNoHat,
    profileAnimation: profileAnimation2,
    profileAnimation2: profileAnimation,
  }
};
