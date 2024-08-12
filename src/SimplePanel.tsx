import React, { useEffect } from 'react';
import { FieldType, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import ReactWordcloud from 'react-wordcloud';
import { countBy, keys, values, repeat } from 'lodash';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();

  const words: Array<{ text: string; value: number }> = [];
  let tags: string[] = [];
  let count: number[] = [];
  let stopWords: string[] = [];

  const tagsField = data.series[options.series_index].fields.find(field =>
    options.datasource_tags_field ? field.name === options.datasource_tags_field : field.type === FieldType.string
  );

  const countField = data.series[options.series_index].fields.find(field =>
    options.datasource_count_field ? field.name === options.datasource_count_field : field.type === FieldType.number
  );
  const stopWordsField = data.series[options.series_index].fields.find(field =>
    options.datasource_stop_words ? field.name === options.datasource_stop_words : field.type === FieldType.string
  );

  if (tagsField && countField) {
    tags = tagsField.values.toArray();
    count = countField.values.toArray();
  }

  if (options.tokenization) {
    const [words, counts] = tokenization(tags, count);
    tags = words;
    count = counts;
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
      words.push({ text: value, value: count[index] });
    }
  });

  const handleClick = (word: any) => {
    const url = new URL(window.location.href);
    const newFilter = `${options.groupByTerm}|=|${word.text}`;
    url.searchParams.append(`var-${options.filterVariableName}`, newFilter);
    window.location.href = url.toString();
  };

  useEffect(() => {
    const handleUrlChange = () => {
      window.location.reload();
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

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
        <ReactWordcloud
          words={words}
          options={options.wordCloudOptions}
          callbacks={
            options.clickable
              ? {
                  onWordClick: handleClick,
                }
              : {}
          }
        />
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

const tokenization = (words: string[], counts: number[]): [string[], number[]] => {
  let content = '';
  const space = ' ';
  words.forEach((w, i) => {
    const count = counts[i];
    content += repeat(w + space, count);
  });

  const matched = content.match(/\w+/g) || [];

  const tokens = matched.map(token => token.toLowerCase());
  const tokensCountBy = countBy(tokens);

  return [keys(tokensCountBy), values(tokensCountBy)];
};
