import { tests } from './a05-tests.js';

let total_score = 0;
let prior_result = null;
for (let i = 0; i < tests.length; i++) {
    document.body.insertAdjacentHTML('beforeend', "<h2>Test "+(i+1)+" of "+tests.length+"</h2>");
    try {
        let next_result = await tests[i](prior_result);

        total_score += next_result.score;
        document.body.append(next_result.report);
        if (next_result.failed) {
            document.body.insertAdjacentHTML('beforeend', "<p>Can not proceed with additional tests</p>");
            break;
        } else {
            document.body.insertAdjacentHTML('beforeend', "<p>Test passes</p>");
        }
        prior_result = next_result;
    } catch (e) {
        document.body.append('Next test threw exception. Skipping all remaining tests');
        break;
    }
}

document.body.insertAdjacentHTML('beforeend', "<h3>Total Score: " + total_score + "</h3>");