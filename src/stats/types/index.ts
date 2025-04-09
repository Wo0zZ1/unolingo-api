import { Stat } from '../entities/stat.entity'

export type ILeaderBoardData = Omit<Stat, 'experienceToNextLevel'> & { username: string }
