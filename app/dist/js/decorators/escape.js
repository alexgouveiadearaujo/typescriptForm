export function escaspe(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let returnOriginalMethod = originalMethod.apply(this, args);
        if (typeof returnOriginalMethod === "string") {
            console.log(`@escape na classe ${this.constructor.name} para método ${propertyKey}`);
            returnOriginalMethod = returnOriginalMethod.replace(/<script>[\s\S]*?<\/script>/, "");
        }
        return returnOriginalMethod;
    };
    return descriptor;
}
