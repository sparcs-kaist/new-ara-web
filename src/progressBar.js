import Vue from 'vue'
const VueProgressBar = require('vue-progressbar')

const options = {
  color: '#f4b9b9',
  failedColor: '#b22020',
  thickness: '5px',
  transition: {
    speed: '0.1s',
    opacity: '0.3s',
    termination: 300
  },
  autoRevert: true,
  location: 'top'
}
Vue.use(VueProgressBar, options)

const progressBar = new Vue()
export default progressBar
