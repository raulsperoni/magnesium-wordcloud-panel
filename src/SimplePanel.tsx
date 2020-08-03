import React from 'react';
import {FieldType, PanelProps} from '@grafana/data';
import {SimpleOptions} from 'types';
import {css, cx} from 'emotion';
import {stylesFactory} from '@grafana/ui';
import ReactWordcloud from 'react-wordcloud';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  //const theme = useTheme();
  const styles = getStyles();

  const words: Array<{ text: string; value: number }> = [];
  let tags: string[] = [];
  let count: number[] = [];
  const tagsField = data.series[options.series_index].fields.find(
    field => options.datasource_tags_field ? field.name === options.datasource_tags_field : field.type === FieldType.string
  );
  const countField = data.series[options.series_index].fields.find(
    field => options.datasource_count_field ? field.name === options.datasource_count_field : field.type === FieldType.number
  );
  if (tagsField && countField) {
    tags = tagsField.values.toArray();
    count = countField.values.toArray();
  }
  tags.forEach((value, index) => {
    words.push({ text: value, value: count[index] });
  });

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
        <ReactWordcloud words={words} options={options.wordCloudOptions} />
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
