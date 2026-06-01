const TALKS_DATA = [
  {
    title: "Introduction to Generative AI",
    speakers: ["Dr. Anya Sharma"],
    categories: ["AI", "Machine Learning"],
    duration: 60,
    description: "An overview of generative AI, its applications, and future trends."
  },
  {
    title: "WebAssembly in Modern Web Development",
    speakers: ["Carlos Rodriguez", "Lena Popova"],
    categories: ["Web Development", "Performance"],
    duration: 60,
    description: "Explore how WebAssembly is changing the landscape of web applications and enabling high-performance experiences."
  },
  {
    title: "Scalable Microservices with Node.js",
    speakers: ["Javier Luna"],
    categories: ["Backend", "Cloud", "Node.js"],
    duration: 60,
    description: "Best practices and patterns for building scalable and resilient microservices using Node.js."
  },
  {
    title: "Advanced CSS Techniques for Responsive Design",
    speakers: ["Sarah Chen"],
    categories: ["Frontend", "UI/UX", "CSS"],
    duration: 60,
    description: "Dive into advanced CSS features like Flexbox, Grid, and custom properties for truly responsive and adaptive designs."
  },
  {
    title: "Demystifying Blockchain Technology",
    speakers: ["David Lee"],
    categories: ["Blockchain", "Security"],
    duration: 60,
    description: "A foundational understanding of blockchain, cryptocurrencies, and their underlying cryptographic principles."
  },
  {
    title: "Practical Data Visualization with D3.js",
    speakers: ["Emily White", "Omar Hassan"],
    categories: ["Data Science", "Frontend", "JavaScript"],
    duration: 60,
    description: "Learn to create interactive and compelling data visualizations using the powerful D3.js library."
  }
];

const EVENT_CONFIG = {
  eventStartTime: "10:00 AM", // Start time of the event
  talkDuration: 60, // minutes
  transitionTime: 10, // minutes between talks
  lunchBreakDuration: 60, // minutes
  lunchBreakStartHour: 13, // 1 PM
  lunchBreakStartMinute: 0,
};

module.exports = { TALKS_DATA, EVENT_CONFIG };
