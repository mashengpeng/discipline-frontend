// 移动端配置
const editor_config = {
  editor: {
    defaultModel: screen.width > 1280 ? 'edit&preview' : 'editOnly',
    height: '100%',
  },
  toolbars: {
    theme: 'light',
  },
};

if (screen.width < 1280) {
  editor_config.toolbars.toolbar = [
    '|',
    'bold',
    'header',
    {
      insert: [

        'italic',
        'strikethrough',
        'color',
        'list',
        'image',
        'audio',
        'video',
        'link',
        'hr',
        'br',
        'code',
        'formula',
        'toc',
        'table',
        'line-table',
        'bar-table',
        'pdf',
        'word',
      ],
    },
    'graph',
    'settings',
  ];
}

// 导出对象
export default editor_config;