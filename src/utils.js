import ora from 'ora';
import shell from 'shelljs';

const spinnerEcho = (info, done) => {
    shell.echo();
    const spinner =  new ora({
        text: info,
        color: 'green',
        spinner: 'arrow3',
    }).start();
    if(done) {
        spinner[done]();
    } else {
        return spinner;
    }
};

export default {spinnerEcho,};
