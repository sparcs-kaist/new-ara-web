import { storiesOf } from '@storybook/vue'

import TextEditor from '../src/components/TheTextEditor.vue'

storiesOf('TextEditor', module)
  .add('default', () => ({
    components: { TextEditor },
    template: `
      <div>
        <TextEditor />
      </div>
    `
  }))