import { Gender } from './enums';

export interface CharacterData {
  id: string;
  ocid: string;
  lastUpdatedAt: string | null;
  basic: CharacterBasicData;
}

export interface CharacterBasicData {
  character_name: string;
  world_name: string;
  character_date_create: string;
  character_date_last_login: string;
  character_date_last_logout: string;
  character_job_name: string;
  character_gender: Gender;
  character_exp: number;
  character_level: number;
}
