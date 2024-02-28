const fs = require('fs');

// Создание объекта конфигурации app.json
const appConfig = {
  name: 'DontSmoke',
  displayName: 'Moke smoke',
};

// Запись app.json в файл
fs.writeFileSync('app.json', JSON.stringify(appConfig, null, 2));
