export function inspect(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`--- Método ${propertyKey}`);
        console.log(`------ parãmetros ${JSON.stringify(args)}`);
        const returnOriginalMethod = originalMethod.apply(this, args);
        console.log(`------ retorno ${JSON.stringify(returnOriginalMethod)}`);
        return returnOriginalMethod;
    };
    return descriptor;
}
