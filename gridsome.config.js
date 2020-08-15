module.exports = {
  siteName: 'Insidert',
  titleTemplate: '%s',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: './content/posts/**/*.md',
        refs: {
          tag: 'Tag',
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Project',
        path: './content/projects/**/*.md',
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Snippet',
        path: './content/snippets/**/*.md',
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-76337962-3'
      }
    }
  ],
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      plugins: [
        ['@gridsome/remark-prismjs', { transformInlineCode: true }]
      ]
    }
  },
  templates: {
    Post: '/posts/:title',
    Tag: '/tags/:title',
    Project: '/projects/:title',
    Snippet: '/snippets/:title'
  }
}
