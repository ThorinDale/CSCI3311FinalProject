import { FirearmLaws } from './firearmLaws/firearmLaws.js';
import { MentalHealth } from './mentalHealth/mentalHealth.js';

d3.csv('./firearmLaws/firearmLaws.csv', d3.autoType).then(data => {
    console.log(data);
    FirearmLaws('.firearm-laws-graph');

})

d3.csv('./mentalHealth/mentalHealth.csv', d3.autoType).then(data => {
    console.log(data);
    MentalHealth('.mental-health-graph');
})

