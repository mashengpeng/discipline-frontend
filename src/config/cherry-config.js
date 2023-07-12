// 移动端配置
const editor_config = {
    editor: {
        defaultModel: window.innerWidth > 1280 ? 'edit&preview' : 'editOnly',
        height: '100%',
    },
    toolbars: {
        theme: 'light',
    },
    table: {
        enableChart: true,
    },
    inlineCode: {
        theme: 'red',
    },
    codeBlock: {
        theme: 'light', // 默认为深色主题
        wrap: false, // 超出长度是否换行，false则显示滚动条
        lineNumber: true, // 默认显示行号
        indentedCodeBlock: true,
    },
    header: {
        /**
         * 标题的样式：
         *  - default       默认样式，标题前面有锚点
         *  - autonumber    标题前面有自增序号锚点
         *  - none          标题没有锚点
         */
        anchorStyle: 'autonumber',
    },
};

if (window.innerWidth < 1280) {
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