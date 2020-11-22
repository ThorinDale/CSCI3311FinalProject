import { FirearmLaws } from './firearmLaws/firearmLaws.js';

d3.csv('./firearmLaws/firearmLaws.csv', d3.autoType).then(data => {
    // console.log(data);
    FirearmLaws('.firearm-laws-graph');

})


