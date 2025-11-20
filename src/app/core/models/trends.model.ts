export interface Trend {
  id: string;
  category: string;
  post_count: string;
  trend_name: string;
  trending_since: string;
  created_at: string;
}

export interface TrendsResponse {
  data: Trend[];
  source: string;
}
