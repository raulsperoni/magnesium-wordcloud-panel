import React from 'react';
import { FieldType, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import ReactWordcloud from 'react-wordcloud';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  //const theme = useTheme();
  const styles = getStyles();

  const words: Array<{ text: string; value: number, color: string }> = [];
  let tags: string[] = [];
  let count: number[] = [];
  let stopWords: string[] = [];
  let colors: string[] = [];

  const tagsField = data.series[options.series_index].fields.find(field =>
    options.datasource_tags_field ? field.name === options.datasource_tags_field : field.type === FieldType.string
  );
  const countField = data.series[options.series_index].fields.find(field =>
    options.datasource_count_field ? field.name === options.datasource_count_field : field.type === FieldType.number
  );
  const stopWordsField = data.series[options.series_index].fields.find(field =>
    options.datasource_stop_words ? field.name === options.datasource_stop_words : field.type === FieldType.string
  );
  const colorsField = data.series[options.series_index].fields.find(field =>
    options.datasource_color_field && field.name === options.datasource_color_field
  );

  if (tagsField && countField) {
    tags = tagsField.values.toArray();
    count = countField.values.toArray();
  }
  if (colorsField) {
    colors = colorsField.values.toArray();
  }
  if (stopWordsField && options.datasource_stop_words !== undefined) {
    stopWords = stopWordsField.values.toArray();
  }
  if (options.stop_words !== undefined) {
    options.stop_words.split(',').forEach(element => {
      stopWords.push(element);
    });
  }
  tags.forEach((value, index) => {
    if (stopWords.indexOf(value) === -1) {
      words.push({ text: value, value: count[index], color: colors[index] });
    }
  });

  const callbacks = !colors.length ? {} : {
    getWordColor: (words: any) => words.color || null
  };

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div style={{ height: height, width: width }}>
        <ReactWordcloud words={words} options={options.wordCloudOptions} callbacks={callbacks} />
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
