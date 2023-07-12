// 移动端配置
const editor_config = {
    editor: {
        defaultModel: screen.width > 1280 ? 'edit&preview' : 'editOnly',
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
        customRenderer: {
            // 自定义语法渲染器
        },
        /**
         * indentedCodeBlock是缩进代码块是否启用的开关
         *
         *    在6.X之前的版本中默认不支持该语法。
         *    因为cherry的开发团队认为该语法太丑了（容易误触）
         *    开发团队希望用```代码块语法来彻底取代该语法
         *    但在后续的沟通中，开发团队发现在某些场景下该语法有更好的显示效果
         *    因此开发团队在6.X版本中才引入了该语法
         *    已经引用6.x以下版本的业务如果想做到用户无感知升级，可以去掉该语法：
         *        indentedCodeBlock：false
         */
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