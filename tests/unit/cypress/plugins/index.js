const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile (file) {
    const pathToConfigFile = path.resolve('./test/cypress/', 'config', `${file}.json`);
    return fs.readJson(pathToConfigFile);
}

// plugins file
module.exports = (on, config) => {
    // config 아래 json 파일을 읽어오되, 기본 값은 dev.json 파일을 읽어오도록 한다.
    const file = config.env.configFile || 'sandbox';
    return getConfigurationByFile(file);
};