export interface Trend {
  category: string;
  post_count: string;
  trend_name: string;
  trending_since: string;
}

export interface TrendsResponse {
  data: Trend[];
  source: string;
}
