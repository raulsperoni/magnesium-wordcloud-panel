import { MinMaxPair, Scale, Spiral } from 'react-wordcloud';

export interface WordCloudOptions {
  colors: string[];
  enableTooltip: boolean;
  deterministic: boolean;
  fontFamily: string;
  fontSizes: MinMaxPair;
  fontStyle: string;
  fontWeight: string;
  padding: number;
  rotations: number;
  rotationAngles: MinMaxPair;
  scale: Scale;
  spiral: Spiral;
  transitionDuration: number;
}

export interface SimpleOptions {
  wordCloudOptions: WordCloudOptions;
  datasource_tags_field: string;
  datasource_count_field: string;
  series_index: number;
  stop_words: string | undefined;
  datasource_stop_words: string;
  datasource_color_field: string;
}
