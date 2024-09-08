export interface Reference {
    [key: string]: string | { IMAGES: string[]; VIDEOS: string[] } | null;
  }

export interface DebateTurn {
    turn_number: number;
    speaker: string;
    role: string;
    content: string;
    claim_of_facts_abstractive_claim: string;
    claim_of_facts_extractive_supporting_quotes_claim: string[];
    claim_of_facts_abstractive_argument: string;
    claim_of_facts_extractive_supporting_quotes_argument: string[];
    claim_of_facts_topic: string;
    claim_of_facts_impacted_groups_populations: string[];
    claim_of_value_abstractive_claim: string;
    claim_of_value_extractive_supporting_quotes_claim: string[];
    claim_of_value_abstractive_argument: string;
    claim_of_value_extractive_supporting_quotes_argument: string[];
    claim_of_value_topic: string;
    claim_of_value_impacted_groups_populations: string[];
    claim_of_policy_abstractive_claim: string;
    claim_of_policy_extractive_supporting_quotes_claim: string[];
    claim_of_policy_abstractive_argument: string;
    claim_of_policy_extractive_supporting_quotes_argument: string[];
    claim_of_policy_topics: string;
    claim_of_policy_impacted_groups_populations: string[];
    epl_ethos_trust: number;
    epl_ethos_power: number;
    epl_ethos_authority: number;
    epl_ethos_credibility: number;
    epl_pathos_anticipation: number;
    epl_pathos_joy: number;
    epl_pathos_trust: number;
    epl_pathos_fear: number;
    epl_pathos_surprise: number;
    epl_pathos_sadness: number;
    epl_pathos_disgust: number;
    epl_pathos_anger: number;
    epl_pathos_irony: number;
    epl_pathos_exaggeration: number;
    epl_pathos_pride: number;
    epl_pathos_bitterness: number;
    epl_pathos_resentment: number;
    epl_pathos_pity: number;
    epl_pathos_shame: number;
    epl_pathos_nostalgia: number;
    epl_pathos_awe: number;
    epl_pathos_remorse: number;
    epl_pathos_gratitude: number;
    epl_pathos_compassion: number;
    epl_logos_premise_strength: number;
    epl_logos_conclusion_strength: number;
    epl_logos_link_premise_conclusion_strength: number;
    epl_logos_bias_types: string[];
    epl_logos_bias_text: string[];
    epl_logos_fallacy_types: string[];
    epl_logos_fallacy_text: string[];
    clarity: number;
    clarity_expl: string;
    topics: string[];
    relevancy: number;
    relevancy_expl: string;
    system1_score: number;
    system1_explanation: string;
    system2_score: number;
    system2_explanation: string;
    facts_topic_ref: (string | null)[][];
    value_topic_ref: (string | null)[][];
    policy_topic_ref: (string | null)[][];
  }
  
  // The JSON data will be an array of these objects:
  type DebateTranscript = DebateTurn[];
  