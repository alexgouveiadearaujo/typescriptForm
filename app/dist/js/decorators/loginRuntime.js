export function loginRuntime(inSeconds = false) {
    return function (target, propertKey, description) {
        const originalMethod = description.value;
        description.value = function (...args) {
            let divider = 1;
            let unity = "milisegundos";
            if (inSeconds) {
                divider = 1000;
                unity = "segundos";
            }
            const t1 = performance.now();
            const returnOriginalMethod = originalMethod.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertKey}, tempo de exercução: ${(t2 - t1) / divider} ${unity}.`);
            returnOriginalMethod;
        };
        return description;
    };
}
