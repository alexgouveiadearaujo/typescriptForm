export function print(...objs) {
    for (let obj of objs) {
        console.log(obj.forText());
    }
}
