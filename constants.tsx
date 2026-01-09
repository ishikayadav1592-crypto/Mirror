
import { Question } from './types';

export const APP_NAME = "Mirror: The Digital Reflection";

export const CHAPTERS = [
  {
    id: 'emotional',
    title: "Situational FOMO Questions (Emotional Trigger)",
    description: "Reflecting on how you react to social exclusion and digital silence."
  },
  {
    id: 'compulsive',
    title: "Compulsive Checking Behaviour (Habit Loop)",
    description: "Analyzing the 'autopilot' triggers that lead you to your device without a conscious command."
  },
  {
    id: 'control',
    title: "Time & Control Distortion (Loss of Control)",
    description: "Looking at how digital spaces can bend your perception of time and boundaries."
  },
  {
    id: 'awareness',
    title: "Self-Awareness (Reflection Layer)",
    description: "A final moment to look deeper at the source of your most frequent checking sessions."
  }
];

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    construct: 'Emotional',
    text: "You see your friends posting stories from a plan you weren’t invited to. What’s your first reaction?",
    options: [
      { label: "I quickly check who’s there and what they’re doing", value: 'A', points: 3 },
      { label: "I feel a bit left out but move on", value: 'B', points: 2 },
      { label: "I mute the app for a while", value: 'C', points: 1 },
      { label: "I don’t really care", value: 'D', points: 0 },
    ],
  },
  {
    id: 'q2',
    construct: 'Emotional',
    text: "When you notice others are active online but not replying to you, you:",
    options: [
      { label: "Keep refreshing to see if they reply", value: 'A', points: 3 },
      { label: "Check once or twice", value: 'B', points: 2 },
      { label: "Get distracted by something else", value: 'C', points: 1 },
      { label: "Forget about it", value: 'D', points: 0 },
    ],
  },
  {
    id: 'q3',
    construct: 'Compulsive',
    text: "How often do you open social media without a clear reason?",
    options: [
      { label: "Almost constantly", value: 'A', points: 3 },
      { label: "Every few minutes", value: 'B', points: 2 },
      { label: "A few times an hour", value: 'C', points: 1 },
      { label: "Only when I need to", value: 'D', points: 0 },
    ],
  },
  {
    id: 'q4',
    construct: 'Compulsive',
    text: "Have you ever unlocked your phone and opened an app without realizing it?",
    options: [
      { label: "Yes, very often", value: 'A', points: 3 },
      { label: "Sometimes", value: 'B', points: 2 },
      { label: "Rarely", value: 'C', points: 1 },
      { label: "Never", value: 'D', points: 0 },
    ],
  },
  {
    id: 'q5',
    construct: 'Control',
    text: "“I check social media for 2 minutes but end up spending much longer.”",
    options: [
      { label: "Strongly Agree", value: 'A', points: 3 },
      { label: "Agree", value: 'B', points: 2 },
      { label: "Neutral", value: 'C', points: 1 },
      { label: "Disagree", value: 'D', points: 0 },
      { label: "Strongly Disagree", value: 'E', points: 0 },
    ],
  },
  {
    id: 'q6',
    construct: 'Control',
    text: "How do you feel if your phone is not nearby?",
    options: [
      { label: "Restless or anxious", value: 'A', points: 3 },
      { label: "Slightly uncomfortable", value: 'B', points: 2 },
      { label: "Neutral", value: 'C', points: 1 },
      { label: "Relieved", value: 'D', points: 0 },
    ],
  },
  {
    id: 'q7',
    construct: 'Awareness',
    text: "Why do you think you check social media so often?",
    options: [
      { label: "To avoid missing updates", value: 'A', points: 3 },
      { label: "Out of boredom", value: 'B', points: 2 },
      { label: "Habit / autopilot", value: 'C', points: 1 },
      { label: "I don’t check it much", value: 'D', points: 0 },
    ],
  },
  {
    id: 'q8',
    construct: 'Awareness',
    text: "On average, how much screen time do you spend daily on social media and communication apps?",
    options: [
      { label: "Over 6 hours", value: 'A', points: 3 },
      { label: "4 - 6 hours", value: 'B', points: 2 },
      { label: "2 - 4 hours", value: 'C', points: 1 },
      { label: "Less than 2 hours", value: 'D', points: 0 },
    ],
  },
];
