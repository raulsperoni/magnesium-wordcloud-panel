import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addBooleanSwitch({
      path: 'tokenization',
      name: 'Tokenization',
      description: 'Count the words for you',
    })
    .addTextInput({
      path: 'datasource_count_field',
      name: 'Count Field',
      description: 'Datasource Count Field',
    })
    .addTextInput({
      path: 'datasource_tags_field',
      name: 'Tags/Words Field',
      description: 'Datasource Tags/Words Field',
    })
    .addTextInput({
      path: 'datasource_stop_words',
      name: 'StopWords Field',
      description: 'Datasource Stopword Field',
    })
    .addTextInput({
      path: 'stop_words',
      name: 'StopWords',
      description: 'Comma separated list of words (i.e.: hello,world)',
    })
    .addNumberInput({
      path: 'series_index',
      name: 'Series index',
      description: 'Datasource series index',
      defaultValue: 0,
    })
    .addTextInput({
      path: 'wordCloudOptions.fontFamily',
      name: 'Font Family',
      description: 'WordCloud Font Family',
      defaultValue: 'arial',
    })
    .addNumberInput({
      path: 'wordCloudOptions.fontSizes[0]',
      name: 'Font min min',
      description: 'WordCloud Font min size',
      defaultValue: 15,
    })
    .addNumberInput({
      path: 'wordCloudOptions.fontSizes[1]',
      name: 'Font max size',
      description: 'WordCloud Font max size',
      defaultValue: 80,
    })
    .addNumberInput({
      path: 'wordCloudOptions.rotationAngles[0]',
      name: 'Min rotation angle',
      description: 'WordCloud min rotation angle',
      defaultValue: 0,
    })
    .addNumberInput({
      path: 'wordCloudOptions.rotationAngles[1]',
      name: 'Max rotation angle',
      description: 'WordCloud max rotation angle',
      defaultValue: 0,
    })
    .addNumberInput({
      path: 'wordCloudOptions.padding',
      name: 'Padding',
      description: 'WordCloud padding',
      defaultValue: 1,
    })
    .addNumberInput({
      path: 'wordCloudOptions.rotations',
      name: 'Rotations',
      description: 'WordCloud rotations',
      defaultValue: 2,
    })
    .addNumberInput({
      path: 'wordCloudOptions.transitionDuration',
      name: 'Transition duration',
      description: 'WordCloud transition duration',
      defaultValue: 800,
    })
    .addBooleanSwitch({
      path: 'wordCloudOptions.enableTooltip',
      name: 'Enable Tooltip',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'wordCloudOptions.deterministic',
      name: 'Deterministic',
      defaultValue: true,
    })
    .addRadio({
      path: 'wordCloudOptions.scale',
      defaultValue: 'sqrt',
      name: 'Wordcloud scale',
      settings: {
        options: [
          {
            value: 'sqrt',
            label: 'Sqrt',
          },
          {
            value: 'linear',
            label: 'Linear',
          },
          {
            value: 'log',
            label: 'Log',
          },
        ],
      },
    })
    .addRadio({
      path: 'wordCloudOptions.spiral',
      defaultValue: 'archimedean',
      name: 'Wordcloud spiral',
      settings: {
        options: [
          {
            value: 'archimedean',
            label: 'Archimedean',
          },
          {
            value: 'rectangular',
            label: 'Rectangular',
          },
        ],
      },
    })
    .addBooleanSwitch({
      path: 'clickable',
      name: 'Enable Clickable Words',
      description: 'Enable words to be clickable for filtering',
      defaultValue: false,
    })
    .addTextInput({
      path: 'groupByTerm',
      name: 'Group By Term',
      description: 'Term to group by',
      showIf: config => config.clickable,
    })
    .addTextInput({
      path: 'filterVariableName',
      name: 'Filter Variable Name',
      description: 'Name of the ad hoc filter variable',
      showIf: config => config.clickable,
    });
});
