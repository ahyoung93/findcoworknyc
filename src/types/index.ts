// Database types
export interface Prompt {
  prompt_date: string
  text: string
  created_at: string
}

export interface Chain {
  id: string
  prompt_date: string
  status: 'open' | 'complete'
  max_contributors: number
  seconds_per_turn: number
  created_at: string
  finished_at: string | null
}

export interface DrawingStroke {
  color: string
  points: [number, number][]
}

export interface Entry {
  id: number
  chain_id: string
  turn_index: number
  drawing_data: DrawingStroke[]
  author_name: string
  author_fingerprint: string
  created_at: string
}

export interface Notification {
  id: number
  chain_id: string
  email: string
  notified: boolean
}

export interface Story {
  chain_id: string
  prompt_date: string
  image_url: string
  contributors: string[]
  finished_at: string
}

export interface Vote {
  story_id: string
  voter_fingerprint: string
  created_at: string
}

// API response types
export interface TodayPromptResponse {
  promptDate: string
  text: string
}

export interface CreateChainRequest {
  initialDrawing: DrawingStroke[]
  penName?: string
  anonymous?: boolean
}

export interface CreateChainResponse {
  chainId: string
  batonUrl: string
  followUrl: string
}

export interface ChainDetailResponse {
  status: 'open' | 'complete'
  promptDate: string
  promptText: string
  secondsPerTurn: number
  turnsFilled: number
  drawingSoFar: DrawingStroke[]
  isFinalTurn: boolean
}

export interface AddEntryRequest {
  drawing: DrawingStroke[]
  penName?: string
  anonymous?: boolean
  email?: string
}

export interface AddEntryResponse {
  isFinalTurn: boolean
  batonUrl: string | null
  followUrl: string
}

export interface FinishChainRequest {
  confirm: boolean
}

export interface FinishChainResponse {
  storyUrl: string
}

export interface StoryListItem {
  chainId: string
  imageUrl: string
  contributors: string[]
  finishedAt: string
  score: number
  hasVoted: boolean
}

export interface StoryListResponse {
  stories: StoryListItem[]
  hasMore: boolean
}

export interface StoryDetailResponse {
  chainId: string
  imageUrl: string
  contributors: string[]
  finishedAt: string
  score: number
  hasVoted: boolean
  promptDate: string
  promptText: string
}

export interface VoteResponse {
  score: number
  hasVoted: boolean
}
