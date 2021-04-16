import {
  JointPhaseData,
  PhaseData,
  PlayerCountryID,
  SequentialPhaseData,
} from "../state/commonTypes.ts";

const setup: PlayerCountryID[] = [
  "fr",
  "ru",
  "tur",
  "aus",
  "pr",
  "gb",
  "spa",
  "swe",
];

const JOINT_STEP_TYPE: "joint" = "joint";
const PARALLEL_STEP_TYPE: "parallel" = "parallel";
const SEQUENTIAL_STEP_TYPE: "sequential" = "sequential";

const POLITICAL_PHASE_DATA: JointPhaseData = {
  id: 0,
  name: "Political Phase",
  type: JOINT_STEP_TYPE,
  order: null,
  steps: [
    {
      id: 0,
      name: "Diplomacy Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 1,
      name: "Declarations of War Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 2,
      name: "Call to Allies Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 3,
      name: "Peace Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 4,
      name: "Creating Alliances Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 5,
      name: "Minor Country Control Step",
      type: PARALLEL_STEP_TYPE,
      order: ["fr", "ru", "tur", "aus", "swe", "pr", "gb", "spa"],
    },
    {
      id: 6,
      name: "Breaking Alliances Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 7,
      name: "Free State Declaration Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 8,
      name: "Declaration of Combined Movement Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
  ],
};

const REINFORCEMENT_PHASE_DATA: JointPhaseData = {
  id: 1,
  name: "Reinforcement Phase",
  type: JOINT_STEP_TYPE,
  order: null,
  steps: [
    {
      id: 0,
      name: "Naval Reinforcement Step",
      type: PARALLEL_STEP_TYPE,
      order: ["spa", "fr", "swe", "pr", "aus", "tur", "ru", "gb"],
    },
    {
      id: 1,
      name: "Land Reinforcement Step",
      type: PARALLEL_STEP_TYPE,
      order: ["spa", "gb", "swe", "pr", "aus", "tur", "ru", "fr"],
    },
  ],
};

const NAVAL_PHASE_DATA: SequentialPhaseData = {
  id: 2,
  name: "Naval Phase",
  type: SEQUENTIAL_STEP_TYPE,
  order: ["gb", "ru", "tur", "aus", "pr", "swe", "fr", "spa"],
  steps: [
    {
      id: 0,
      name: "Naval Movement Step",
      type: SEQUENTIAL_STEP_TYPE,
      order: null,
    },
    {
      id: 0,
      name: "Naval Combat Step",
      type: SEQUENTIAL_STEP_TYPE,
      order: null,
    },
  ],
};

const LAND_PHASE_DATA: SequentialPhaseData = {
  id: 3,
  name: "Land Phase",
  type: SEQUENTIAL_STEP_TYPE,
  order: ["fr", "ru", "tur", "aus", "pr", "swe", "gb", "spa"],
  steps: [
    {
      id: 0,
      name: "Naval Movement Step",
      type: SEQUENTIAL_STEP_TYPE,
      order: null,
    },
    {
      id: 0,
      name: "Naval Combat Step",
      type: SEQUENTIAL_STEP_TYPE,
      order: null,
    },
  ],
};

const ECONOMIC_PHASE_DATA: JointPhaseData = {
  id: 4,
  name: "Economic Phase",
  type: JOINT_STEP_TYPE,
  order: null,
  steps: [
    {
      id: 0,
      name: "Victory Points Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 1,
      name: "Money and Manpower Collection Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 2,
      name: "Lending Money Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 3,
      name: "Manipulation Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 4,
      name: "Money and Manpower Expenditure Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 5,
      name: "Political Status Adjustment Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 6,
      name: "Civil Disorder Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 7,
      name: "Ceding Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 8,
      name: "New Political Combinations Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 9,
      name: "Levy Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
    {
      id: 10,
      name: "UMP Control Step",
      type: JOINT_STEP_TYPE,
      order: null,
    },
  ],
};

export const EIGHT_PLAYER_CAMPAIGN_ORDER = [
  POLITICAL_PHASE_DATA,
  REINFORCEMENT_PHASE_DATA,
  NAVAL_PHASE_DATA,
  LAND_PHASE_DATA,
  ECONOMIC_PHASE_DATA,
];
