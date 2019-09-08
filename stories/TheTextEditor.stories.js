import { storiesOf } from '@storybook/vue'

import TextEditor from '../src/components/TheTextEditor.vue'

storiesOf('TextEditor', module)
  .add('default', () => ({
    components: { TextEditor },
    data() {
      return {
        dataContent: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{
                type: "text",
                text: ""
              }]
            }
          ]
        },
        editable: true,
      }
    },
    template: `
      <div>
        <TextEditor :content="dataContent" :editable="editable"/>
      </div>
    `
  }))
  .add('show data', () => ({
    components: { TextEditor },
    data() {
      return {
        dataContent: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{
                type: "text",
                text: "hello, world"
              }]
            }
          ]
        },
        editable: false,
      }
    },
    template: `
      <div>
        <TextEditor :content="dataContent" :editable="editable"/>
      </div>
    `
  }))