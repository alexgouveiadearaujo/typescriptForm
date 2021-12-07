export function loginRuntime(inSeconds: boolean = false) {
  return function (
    target: any,
    propertKey: string,
    description: PropertyDescriptor
  ) {
    const originalMethod = description.value;
    description.value = function (...args: any[]) {
        let divider = 1
        let unity = "milisegundos"
        if(inSeconds){
            divider = 1000
            unity = "segundos"
        }
      const t1 = performance.now();
      const returnOriginalMethod = originalMethod.apply(this, args);
      const t2 = performance.now();
      console.log(
        `${propertKey}, tempo de exercução: ${(t2 - t1) / divider} ${unity}.`
      );
      returnOriginalMethod;
    };
    return description;
  };
}
